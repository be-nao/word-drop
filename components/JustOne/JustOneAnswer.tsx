"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Send } from "lucide-react";
import { useState } from "react";

interface JustOneAnswerProps {
  uniqueHints: string[];
  onSubmitAnswer: (answer: string) => void;
}

export default function JustOneAnswer({
  uniqueHints,
  onSubmitAnswer,
}: JustOneAnswerProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-base font-medium text-blue-800">
            回答者の方、これらのヒントから答えを当ててください
          </AlertDescription>
        </Alert>
        <CardTitle className="text-3xl md:text-4xl font-bold">
          回答タイム
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">
            ヒント ({uniqueHints.length}個)
          </h3>
          {uniqueHints.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {uniqueHints.map((hint, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 text-center"
                >
                  <span className="text-2xl font-bold text-blue-700">
                    {hint}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-base font-medium text-red-800">
                有効なヒントがありません。全て重複してしまいました。
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-center">あなたの答え</h3>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="答えを入力してください"
            className="w-full px-6 py-4 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-bold"
            onKeyDown={(e) => {
              if (e.key === "Enter" && answer.trim()) {
                handleSubmit();
              }
            }}
            autoFocus
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          size="lg"
          className="w-full text-xl h-16 bg-green-600 hover:bg-green-700"
        >
          <Send className="mr-2 h-6 w-6" />
          答えを確定
        </Button>
      </CardContent>
    </Card>
  );
}
