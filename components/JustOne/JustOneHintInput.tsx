"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Send, Users, CheckCircle, User } from "lucide-react";
import { useState } from "react";

interface JustOneHintInputProps {
  onSubmitHints: (hints: string[]) => void;
  onBack: () => void;
}

type PlayerHint = {
  playerNumber: number;
  hint: string;
  submitted: boolean;
};

export default function JustOneHintInput({
  onSubmitHints,
  onBack,
}: JustOneHintInputProps) {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [currentHint, setCurrentHint] = useState("");
  const [playerHints, setPlayerHints] = useState<PlayerHint[]>([]);

  // プレイヤー人数設定画面
  if (playerCount === null) {
    return (
      <Card className="shadow-xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            プレイヤー人数設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="bg-slate-50 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-slate-700">注意</p>
            <ul className="text-sm md:text-base text-slate-600 space-y-1 list-disc list-inside">
              <li>回答者は含めません（ヒントを出す人の人数）</li>
              <li>各プレイヤーは順番にヒントを入力します</li>
              <li>他のプレイヤーのヒントは見えません</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-center text-lg font-semibold">
              ヒントを出すプレイヤーの人数は？
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  onClick={() => {
                    setPlayerCount(num);
                    setPlayerHints(
                      Array.from({ length: num }, (_, i) => ({
                        playerNumber: i + 1,
                        hint: "",
                        submitted: false,
                      }))
                    );
                  }}
                  size="lg"
                  className="h-20 text-2xl bg-green-600 hover:bg-green-700"
                >
                  <Users className="mr-2 h-6 w-6" />
                  {num}人
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="w-full text-lg h-16"
          >
            お題に戻る
          </Button>
        </CardContent>
      </Card>
    );
  }

  // プレイヤー選択画面
  if (currentPlayer === null) {
    const submittedCount = playerHints.filter((p) => p.submitted).length;
    const allSubmitted = submittedCount === playerCount;

    return (
      <Card className="shadow-xl">
        <CardHeader className="text-center space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-base font-medium text-blue-800">
              他のプレイヤーに見られないよう注意してください
            </AlertDescription>
          </Alert>
          <CardTitle className="text-3xl md:text-4xl font-bold">
            ヒント入力 ({submittedCount}/{playerCount}人完了)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="space-y-4">
            <p className="text-center text-lg font-semibold">
              あなたのプレイヤー番号を選んでください
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {playerHints.map((player) => (
                <Button
                  key={player.playerNumber}
                  onClick={() => setCurrentPlayer(player.playerNumber)}
                  disabled={player.submitted}
                  size="lg"
                  className={`h-20 text-xl ${
                    player.submitted
                      ? "bg-gray-300 hover:bg-gray-300"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {player.submitted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      P{player.playerNumber} 完了
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-5 w-5" />
                      プレイヤー{player.playerNumber}
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                setPlayerCount(null);
                setPlayerHints([]);
                setCurrentPlayer(null);
              }}
              variant="outline"
              size="lg"
              className="flex-1 text-lg h-16"
            >
              人数を変更
            </Button>
            <Button
              onClick={() => {
                const validHints = playerHints
                  .filter((p) => p.submitted && p.hint.trim() !== "")
                  .map((p) => p.hint);
                if (validHints.length > 0) {
                  onSubmitHints(validHints);
                }
              }}
              disabled={!allSubmitted}
              size="lg"
              className="flex-1 text-lg h-16 bg-green-600 hover:bg-green-700"
            >
              <Send className="mr-2 h-5 w-5" />
              全員完了 - 次へ
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 個別プレイヤーのヒント入力画面
  const handleSubmitHint = () => {
    if (currentHint.trim()) {
      setPlayerHints((prev) =>
        prev.map((p) =>
          p.playerNumber === currentPlayer
            ? { ...p, hint: currentHint.trim(), submitted: true }
            : p
        )
      );
      setCurrentHint("");
      setCurrentPlayer(null);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center space-y-4">
        <Alert className="bg-green-50 border-green-200">
          <User className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-base font-medium text-green-800">
            プレイヤー{currentPlayer}のターンです
          </AlertDescription>
        </Alert>
        <CardTitle className="text-3xl md:text-4xl font-bold">
          ヒント入力
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        <div className="bg-slate-50 rounded-lg p-4 md:p-6 space-y-2">
          <p className="font-semibold text-slate-700">注意事項</p>
          <ul className="text-sm md:text-base text-slate-600 space-y-1 list-disc list-inside">
            <li>1単語のヒントを入力してください</li>
            <li>他の人とヒントが被ると無効になります</li>
            <li>できるだけユニークなヒントを考えましょう</li>
            <li>入力後は他のプレイヤーに端末を渡してください</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-center text-lg font-semibold">
            あなたのヒントを入力
          </p>
          <input
            type="text"
            value={currentHint}
            onChange={(e) => setCurrentHint(e.target.value)}
            placeholder="ヒントを入力..."
            className="w-full px-6 py-4 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-bold"
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentHint.trim()) {
                handleSubmitHint();
              }
            }}
            autoFocus
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setCurrentPlayer(null)}
            variant="outline"
            size="lg"
            className="flex-1 text-lg h-16"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSubmitHint}
            disabled={!currentHint.trim()}
            size="lg"
            className="flex-1 text-lg h-16 bg-green-600 hover:bg-green-700"
          >
            <Send className="mr-2 h-5 w-5" />
            ヒントを確定
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
