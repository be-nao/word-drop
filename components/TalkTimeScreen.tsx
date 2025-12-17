"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, RotateCcw, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TalkTimeScreenProps {
  initialDuration: number;
  onShowResult: () => void;
  onTimerDurationChange: (duration: number) => void;
}

const TIMER_OPTIONS = [
  { label: "1分", value: 60 },
  { label: "3分", value: 180 },
  { label: "5分", value: 300 },
  { label: "10分", value: 600 },
];

export default function TalkTimeScreen({
  initialDuration,
  onShowResult,
  onTimerDurationChange,
}: TalkTimeScreenProps) {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(initialDuration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(currentDuration);
  };

  const handleDurationChange = (duration: number) => {
    if (!isRunning) {
      setCurrentDuration(duration);
      setTimeLeft(duration);
      setIsFinished(false);
      onTimerDurationChange(duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}分`;
  };

  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-bold">
          トークタイム
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        <div className="space-y-6">
          {/* タイマー表示 */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 md:p-12 border-4 border-slate-300">
              <div
                className={`text-center text-7xl md:text-9xl font-bold tabular-nums transition-colors duration-300 ${
                  timeLeft <= 10 && timeLeft > 0
                    ? "text-red-500 animate-pulse"
                    : isFinished
                    ? "text-red-600"
                    : "text-slate-700"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
            </div>
            {/* プログレスバー */}
            <div className="mt-4 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${
                  timeLeft <= 30
                    ? "bg-red-500"
                    : timeLeft <= 60
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 時間設定 */}
          <div className="bg-slate-50 rounded-lg p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="h-5 w-5" />
              <p className="font-semibold text-base md:text-lg">議論時間を設定</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TIMER_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleDurationChange(option.value)}
                  variant={currentDuration === option.value ? "default" : "outline"}
                  size="lg"
                  className="h-16 text-lg font-semibold"
                  disabled={isRunning}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <p className="text-sm md:text-base text-center text-muted-foreground">
              {isRunning
                ? "タイマー停止中のみ変更できます"
                : `選択中：${formatDuration(currentDuration)}`}
            </p>
          </div>

          {/* 終了メッセージ */}
          {isFinished && (
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-600 animate-bounce">
                トーク終了！
              </p>
            </div>
          )}

          {/* コントロールボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                variant="default"
                className="flex-1 text-xl h-16"
                disabled={isFinished}
              >
                <Play className="mr-2 h-6 w-6" />
                {timeLeft === currentDuration ? "開始" : "再開"}
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                variant="secondary"
                className="flex-1 text-xl h-16"
              >
                <Pause className="mr-2 h-6 w-6" />
                一時停止
              </Button>
            )}
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="flex-1 text-xl h-16"
            >
              <RotateCcw className="mr-2 h-6 w-6" />
              リセット
            </Button>
          </div>

          {/* 結果発表へボタン */}
          <div className="pt-4 border-t">
            <Button
              onClick={onShowResult}
              size="lg"
              className="w-full text-xl h-16"
            >
              結果発表へ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
