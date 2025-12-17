"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Sparkles } from "lucide-react";

interface ResultScreenProps {
  currentWord: string;
  onNextRound: () => void;
}

export default function ResultScreen({
  currentWord,
  onNextRound,
}: ResultScreenProps) {
  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-bold">
          結果発表
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        <div className="space-y-6">
          {/* お題表示 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border-4 border-purple-200">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <p className="text-lg md:text-xl text-purple-700 font-semibold">
                  今回のお題
                </p>
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-5xl md:text-7xl font-bold text-purple-600">
                {currentWord}
              </p>
            </div>
          </div>

          {/* 判定エリア */}
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 space-y-4">
            <p className="text-center text-xl md:text-2xl font-semibold text-slate-700">
              判定
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                <p className="text-center text-base text-slate-600 mb-2">
                  バレずに言えた
                </p>
                <p className="text-center text-3xl font-bold text-green-600">
                  親の勝ち
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <p className="text-center text-base text-slate-600 mb-2">
                  バレた
                </p>
                <p className="text-center text-3xl font-bold text-blue-600">
                  他プレイヤーの勝ち
                </p>
              </div>
            </div>
          </div>

          {/* メモエリア */}
          <div className="bg-amber-50 rounded-xl p-4 md:p-6 border-2 border-amber-200">
            <p className="text-sm md:text-base text-amber-800">
              <span className="font-semibold">💡 ポイント：</span>
              勝敗の判定は、他のプレイヤーの反応や話し合いで決めましょう！
              親が自然に会話に溶け込ませられたかがカギです。
            </p>
          </div>

          {/* 次のラウンドボタン */}
          <Button
            onClick={onNextRound}
            size="lg"
            className="w-full text-xl h-16"
          >
            <RotateCcw className="mr-2 h-6 w-6" />
            次のラウンド
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
