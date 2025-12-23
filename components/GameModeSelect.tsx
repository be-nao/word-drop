"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users } from "lucide-react";

interface GameModeSelectProps {
  onSelectMode: (mode: "word-wolf" | "just-one") => void;
}

export default function GameModeSelect({ onSelectMode }: GameModeSelectProps) {
  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-bold">
          ゲームモード選択
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ワードウルフモード */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-400"
            onClick={() => onSelectMode("word-wolf")}
          >
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center">ワード落とし</h3>
              <p className="text-sm text-muted-foreground text-center">
                お題を会話に紛れ込ませて、他のプレイヤーにバレないようにするゲーム
              </p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1 text-sm">
                <p className="font-semibold text-slate-700">遊び方</p>
                <ul className="text-slate-600 space-y-1 list-disc list-inside text-xs">
                  <li>親がお題を確認</li>
                  <li>会話でお題を自然に言う</li>
                  <li>バレずに言えたら成功</li>
                </ul>
              </div>
              <Button className="w-full" size="lg">
                このモードで遊ぶ
              </Button>
            </CardContent>
          </Card>

          {/* ジャストワンモード */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-400"
            onClick={() => onSelectMode("just-one")}
          >
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center">ジャストワン</h3>
              <p className="text-sm text-muted-foreground text-center">
                ユニークなヒントを出し合って、回答者がお題を当てる協力ゲーム
              </p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1 text-sm">
                <p className="font-semibold text-slate-700">遊び方</p>
                <ul className="text-slate-600 space-y-1 list-disc list-inside text-xs">
                  <li>回答者以外がお題を確認</li>
                  <li>各自ヒントを1つ入力</li>
                  <li>重複したヒントは無効</li>
                  <li>回答者が答えを当てる</li>
                </ul>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                このモードで遊ぶ
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
