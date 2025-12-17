"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, Shuffle } from "lucide-react";
import { useState } from "react";

interface TopicScreenProps {
  currentWord: string;
  onDrawTopic: () => void;
  onStartTalk: () => void;
}

export default function TopicScreen({
  currentWord,
  onDrawTopic,
  onStartTalk,
}: TopicScreenProps) {
  const [isWordVisible, setIsWordVisible] = useState(true);

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center space-y-4">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-base font-medium text-yellow-800">
            ※ 親プレイヤーだけ見てください
          </AlertDescription>
        </Alert>
        <CardTitle className="text-3xl md:text-4xl font-bold">
          お題確認
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        {!currentWord ? (
          <div className="text-center space-y-8">
            <p className="text-muted-foreground text-lg md:text-xl">
              お題を引いてゲームを始めましょう
            </p>
            <Button
              onClick={onDrawTopic}
              size="lg"
              className="w-full md:w-auto text-xl px-16 py-8 h-auto min-h-[4rem]"
            >
              <Shuffle className="mr-3 h-6 w-6" />
              お題を引く
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 md:p-12 border-2 border-blue-200">
              <div className="text-center space-y-4">
                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  今回のお題
                </p>
                <div className="relative">
                  {isWordVisible ? (
                    <p className="text-4xl md:text-6xl font-bold text-blue-600">
                      {currentWord}
                    </p>
                  ) : (
                    <p className="text-4xl md:text-6xl font-bold text-gray-300">
                      ●●●●
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setIsWordVisible(!isWordVisible)}
                  className="text-blue-600 hover:text-blue-700 h-14 text-base"
                >
                  {isWordVisible ? (
                    <>
                      <EyeOff className="mr-2 h-5 w-5" />
                      お題を隠す
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-5 w-5" />
                      お題を表示
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 md:p-6 space-y-2">
              <p className="font-semibold text-slate-700">ルール</p>
              <ul className="text-sm md:text-base text-slate-600 space-y-1 list-disc list-inside">
                <li>会話の中にお題ワードを自然に紛れ込ませる</li>
                <li>他のプレイヤーにバレないように言う</li>
                <li>トークタイム画面で議論時間を設定できます</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onDrawTopic}
                variant="outline"
                size="lg"
                className="flex-1 text-lg h-16"
              >
                <Shuffle className="mr-2 h-5 w-5" />
                お題を引き直す
              </Button>
              <Button
                onClick={onStartTalk}
                size="lg"
                className="flex-1 text-lg h-16"
              >
                トーク開始へ
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
