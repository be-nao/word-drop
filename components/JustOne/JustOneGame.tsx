"use client";

import { useState } from "react";
import JustOneTopicScreen from "./JustOneTopicScreen";
import JustOneHintInput from "./JustOneHintInput";
import JustOneHintReview from "./JustOneHintReview";
import JustOneAnswer from "./JustOneAnswer";
import JustOneResult from "./JustOneResult";

type JustOneStep = "topic" | "hint-input" | "hint-review" | "answer" | "result";

interface JustOneGameProps {
  onBackToModeSelect: () => void;
}

export default function JustOneGame({ onBackToModeSelect }: JustOneGameProps) {
  const [step, setStep] = useState<JustOneStep>("topic");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [hints, setHints] = useState<string[]>([]);
  const [uniqueHints, setUniqueHints] = useState<string[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState<string>("");

  const handleDrawTopic = (word: string) => {
    setCurrentWord(word);
  };

  const handleStartHintInput = () => {
    setStep("hint-input");
  };

  const handleSubmitHints = (submittedHints: string[]) => {
    setHints(submittedHints);

    // 重複チェック
    const hintCounts = new Map<string, number>();
    submittedHints.forEach(hint => {
      const normalizedHint = hint.trim().toLowerCase();
      hintCounts.set(normalizedHint, (hintCounts.get(normalizedHint) || 0) + 1);
    });

    // ユニークなヒントのみ抽出
    const unique = submittedHints.filter(hint => {
      const normalizedHint = hint.trim().toLowerCase();
      return hintCounts.get(normalizedHint) === 1;
    });

    setUniqueHints(unique);
    setStep("hint-review");
  };

  const handleStartAnswer = () => {
    setStep("answer");
  };

  const handleSubmitAnswer = (answer: string) => {
    setPlayerAnswer(answer);
    setStep("result");
  };

  const handleNextRound = () => {
    setCurrentWord("");
    setHints([]);
    setUniqueHints([]);
    setPlayerAnswer("");
    setStep("topic");
  };

  return (
    <>
      {step === "topic" && (
        <JustOneTopicScreen
          currentWord={currentWord}
          onDrawTopic={handleDrawTopic}
          onStartHintInput={handleStartHintInput}
          onBackToModeSelect={onBackToModeSelect}
        />
      )}
      {step === "hint-input" && (
        <JustOneHintInput
          onSubmitHints={handleSubmitHints}
          onBack={() => setStep("topic")}
        />
      )}
      {step === "hint-review" && (
        <JustOneHintReview
          allHints={hints}
          uniqueHints={uniqueHints}
          onStartAnswer={handleStartAnswer}
        />
      )}
      {step === "answer" && (
        <JustOneAnswer
          uniqueHints={uniqueHints}
          onSubmitAnswer={handleSubmitAnswer}
        />
      )}
      {step === "result" && (
        <JustOneResult
          correctWord={currentWord}
          playerAnswer={playerAnswer}
          onNextRound={handleNextRound}
          onBackToModeSelect={onBackToModeSelect}
        />
      )}
    </>
  );
}
