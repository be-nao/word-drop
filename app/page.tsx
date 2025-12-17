"use client";

import { useState } from "react";
import { getRandomWord } from "./data/words";
import TopicScreen from "@/components/TopicScreen";
import TalkTimeScreen from "@/components/TalkTimeScreen";
import ResultScreen from "@/components/ResultScreen";

type GameStep = "topic" | "talk" | "result";

export default function Home() {
  const [step, setStep] = useState<GameStep>("topic");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [timerDuration, setTimerDuration] = useState<number>(180); // デフォルト3分

  const handleDrawTopic = () => {
    const word = getRandomWord();
    setCurrentWord(word);
  };

  const handleStartTalk = () => {
    setStep("talk");
  };

  const handleShowResult = () => {
    setStep("result");
  };

  const handleNextRound = () => {
    setCurrentWord("");
    setStep("topic");
  };

  const handleTimerDurationChange = (duration: number) => {
    setTimerDuration(duration);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-2xl">
        {step === "topic" && (
          <TopicScreen
            currentWord={currentWord}
            onDrawTopic={handleDrawTopic}
            onStartTalk={handleStartTalk}
          />
        )}
        {step === "talk" && (
          <TalkTimeScreen
            initialDuration={timerDuration}
            onShowResult={handleShowResult}
            onTimerDurationChange={handleTimerDurationChange}
          />
        )}
        {step === "result" && (
          <ResultScreen currentWord={currentWord} onNextRound={handleNextRound} />
        )}
      </div>
    </main>
  );
}
