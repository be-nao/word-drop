"use client";

import { useState } from "react";
import { getRandomWord } from "./data/words";
import GameModeSelect from "@/components/GameModeSelect";
import TopicScreen from "@/components/TopicScreen";
import TalkTimeScreen from "@/components/TalkTimeScreen";
import ResultScreen from "@/components/ResultScreen";
import JustOneGame from "@/components/JustOne/JustOneGame";

type GameMode = "select" | "word-wolf" | "just-one";
type GameStep = "topic" | "talk" | "result";

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("select");
  const [step, setStep] = useState<GameStep>("topic");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [timerDuration, setTimerDuration] = useState<number>(180); // デフォルト3分

  const handleDrawTopic = () => {
    const word = getRandomWord();
    setCurrentWord(word);
  };

  const handleSetCustomWord = (word: string) => {
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

  const handleSelectMode = (mode: "word-wolf" | "just-one") => {
    setGameMode(mode);
    setStep("topic");
    setCurrentWord("");
  };

  const handleBackToModeSelect = () => {
    setGameMode("select");
    setStep("topic");
    setCurrentWord("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-2xl">
        {gameMode === "select" && (
          <GameModeSelect onSelectMode={handleSelectMode} />
        )}

        {gameMode === "word-wolf" && (
          <>
            {step === "topic" && (
              <TopicScreen
                currentWord={currentWord}
                onDrawTopic={handleDrawTopic}
                onStartTalk={handleStartTalk}
                onSetCustomWord={handleSetCustomWord}
                onBackToModeSelect={handleBackToModeSelect}
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
          </>
        )}

        {gameMode === "just-one" && (
          <JustOneGame onBackToModeSelect={handleBackToModeSelect} />
        )}
      </div>
    </main>
  );
}
