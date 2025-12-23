"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, Shuffle, Edit, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { getRandomWord } from "@/app/data/words";

interface JustOneTopicScreenProps {
  currentWord: string;
  onDrawTopic: (word: string) => void;
  onStartHintInput: () => void;
  onBackToModeSelect: () => void;
}

export default function JustOneTopicScreen({
  currentWord,
  onDrawTopic,
  onStartHintInput,
  onBackToModeSelect,
}: JustOneTopicScreenProps) {
  const [isWordVisible, setIsWordVisible] = useState(true);
  const [customWord, setCustomWord] = useState("");

  const handleDrawTopic = () => {
    const word = getRandomWord();
    onDrawTopic(word);
  };

  const handleSetCustomWord = (word: string) => {
    onDrawTopic(word);
    setCustomWord("");
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToModeSelect}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            モード選択へ
          </Button>
          <div className="flex-1" />
        </div>
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-base font-medium text-green-800">
            ※ 回答者以外のプレイヤーが見てください
          </AlertDescription>
        </Alert>
        <CardTitle className="text-3xl md:text-4xl font-bold">
          ジャストワン - お題確認
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        {!currentWord ? (
          <div className="text-center space-y-8">
            <p className="text-muted-foreground text-lg md:text-xl">
              お題を引いてゲームを始めましょう
            </p>
            <Button
              onClick={handleDrawTopic}
              size="lg"
              className="w-full md:w-auto text-xl px-16 py-8 h-auto min-h-[4rem] bg-green-600 hover:bg-green-700"
            >
              <Shuffle className="mr-3 h-6 w-6" />
              お題を引く
            </Button>

            <div className="border-t pt-8 space-y-4">
              <p className="text-muted-foreground text-base">
                または、カスタムお題を入力
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value)}
                  placeholder="お題を入力..."
                  className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customWord.trim()) {
                      handleSetCustomWord(customWord.trim());
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (customWord.trim()) {
                      handleSetCustomWord(customWord.trim());
                    }
                  }}
                  disabled={!customWord.trim()}
                  size="lg"
                  className="text-base px-8 h-12 bg-green-600 hover:bg-green-700"
                >
                  <Edit className="mr-2 h-5 w-5" />
                  使用
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 md:p-8 border-2 border-green-200">
              <div className="text-center space-y-2">
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                  今回のお題
                </p>
                <div className="relative py-2">
                  {isWordVisible ? (
                    <p className="text-3xl md:text-5xl font-bold text-green-600">
                      {currentWord}
                    </p>
                  ) : (
                    <p className="text-3xl md:text-5xl font-bold text-gray-300">
                      ●●●●
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWordVisible(!isWordVisible)}
                  className="text-green-600 hover:text-green-700 h-10 text-sm"
                >
                  {isWordVisible ? (
                    <>
                      <EyeOff className="mr-1 h-4 w-4" />
                      隠す
                    </>
                  ) : (
                    <>
                      <Eye className="mr-1 h-4 w-4" />
                      表示
                    </>
                  )}
                </Button>
              </div>
            </div>

            <details className="bg-slate-50 rounded-lg">
              <summary className="cursor-pointer p-3 font-semibold text-slate-700 text-sm">
                ルール・設定
              </summary>
              <div className="px-3 pb-3 space-y-3">
                <ul className="text-xs md:text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>各プレイヤーは1つだけヒントを出せます</li>
                  <li>他のプレイヤーと同じヒントを出すと無効になります</li>
                  <li>できるだけユニークなヒントを考えましょう</li>
                  <li>回答者はヒントを見て答えを当てます</li>
                </ul>

                <div className="border-t pt-3 space-y-2">
                  <p className="text-muted-foreground text-xs text-center">
                    カスタムお題に変更
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customWord}
                      onChange={(e) => setCustomWord(e.target.value)}
                      placeholder="お題を入力..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customWord.trim()) {
                          handleSetCustomWord(customWord.trim());
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (customWord.trim()) {
                          handleSetCustomWord(customWord.trim());
                        }
                      }}
                      disabled={!customWord.trim()}
                      size="sm"
                      variant="outline"
                      className="text-xs px-4"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      変更
                    </Button>
                  </div>
                </div>
              </div>
            </details>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDrawTopic}
                variant="outline"
                size="lg"
                className="flex-1 text-base h-14"
              >
                <Shuffle className="mr-2 h-5 w-5" />
                お題を引き直す
              </Button>
              <Button
                onClick={onStartHintInput}
                size="lg"
                className="flex-1 text-base h-14 bg-green-600 hover:bg-green-700"
              >
                ヒント入力へ
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
