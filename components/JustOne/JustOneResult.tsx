"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";

interface JustOneResultProps {
  correctWord: string;
  playerAnswer: string;
  onNextRound: () => void;
  onBackToModeSelect: () => void;
}

export default function JustOneResult({
  correctWord,
  playerAnswer,
  onNextRound,
  onBackToModeSelect,
}: JustOneResultProps) {
  const isCorrect = correctWord.trim().toLowerCase() === playerAnswer.trim().toLowerCase();

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-bold">
          結果発表
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        {/* 正解/不正解の表示 */}
        <div className={`rounded-lg p-8 text-center ${
          isCorrect
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300"
            : "bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300"
        }`}>
          {isCorrect ? (
            <>
              <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-4" />
              <p className="text-4xl md:text-5xl font-bold text-green-700 mb-2">
                正解！
              </p>
              <p className="text-xl text-green-600">
                素晴らしいチームワークです！
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 text-red-600 mx-auto mb-4" />
              <p className="text-4xl md:text-5xl font-bold text-red-700 mb-2">
                残念...
              </p>
              <p className="text-xl text-red-600">
                次回頑張りましょう！
              </p>
            </>
          )}
        </div>

        {/* 答えの比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <p className="text-sm text-blue-600 font-semibold mb-2">正解</p>
            <p className="text-3xl md:text-4xl font-bold text-blue-700">
              {correctWord}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <p className="text-sm text-purple-600 font-semibold mb-2">あなたの答え</p>
            <p className="text-3xl md:text-4xl font-bold text-purple-700">
              {playerAnswer}
            </p>
          </div>
        </div>

        {/* スコア表示（オプション：将来的に追加可能） */}
        {isCorrect && (
          <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200 text-center">
            <p className="text-lg font-semibold text-yellow-800">
              🎉 チーム勝利！ 🎉
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onBackToModeSelect}
            variant="outline"
            size="lg"
            className="flex-1 text-lg h-16"
          >
            <Home className="mr-2 h-5 w-5" />
            モード選択へ
          </Button>
          <Button
            onClick={onNextRound}
            size="lg"
            className="flex-1 text-lg h-16 bg-green-600 hover:bg-green-700"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            もう一度プレイ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
