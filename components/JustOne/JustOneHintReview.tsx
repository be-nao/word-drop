"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, XCircle, CheckCircle, ArrowRight } from "lucide-react";

interface JustOneHintReviewProps {
  allHints: string[];
  uniqueHints: string[];
  onStartAnswer: () => void;
}

export default function JustOneHintReview({
  allHints,
  uniqueHints,
  onStartAnswer,
}: JustOneHintReviewProps) {
  // 重複しているヒントを見つける
  const hintCounts = new Map<string, number>();
  allHints.forEach(hint => {
    const normalizedHint = hint.trim().toLowerCase();
    hintCounts.set(normalizedHint, (hintCounts.get(normalizedHint) || 0) + 1);
  });

  const duplicateHints = allHints.filter(hint => {
    const normalizedHint = hint.trim().toLowerCase();
    return hintCounts.get(normalizedHint)! > 1;
  });

  const hasDuplicates = duplicateHints.length > 0;

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center space-y-4">
        <Alert className="bg-orange-50 border-orange-200">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-base font-medium text-orange-800">
            ※ 回答者は見ないでください
          </AlertDescription>
        </Alert>
        <CardTitle className="text-3xl md:text-4xl font-bold">
          ヒント確認
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        {hasDuplicates && (
          <Alert className="bg-red-50 border-red-200">
            <XCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-base font-medium text-red-800">
              重複したヒントが見つかりました！これらは回答者に表示されません。
            </AlertDescription>
          </Alert>
        )}

        {!hasDuplicates && uniqueHints.length > 0 && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-base font-medium text-green-800">
              全てのヒントがユニークです！
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            有効なヒント ({uniqueHints.length}個)
          </h3>
          {uniqueHints.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {uniqueHints.map((hint, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-lg font-medium text-green-700">
                    {hint}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">有効なヒントがありません</p>
            </div>
          )}
        </div>

        {hasDuplicates && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">
              無効なヒント（重複）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from(new Set(duplicateHints.map(h => h.trim().toLowerCase()))).map((hint, index) => {
                const originalHint = duplicateHints.find(h => h.trim().toLowerCase() === hint)!;
                const count = allHints.filter(h => h.trim().toLowerCase() === hint).length;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3"
                  >
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-lg font-medium text-red-700">
                        {originalHint}
                      </span>
                      <span className="text-sm text-red-500 ml-2">
                        (×{count})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-4 md:p-6 space-y-2">
          <p className="font-semibold text-slate-700">次のステップ</p>
          <p className="text-sm md:text-base text-slate-600">
            回答者に端末を渡して、有効なヒントを見せながら答えを当ててもらいましょう。
          </p>
        </div>

        <Button
          onClick={onStartAnswer}
          size="lg"
          className="w-full text-lg h-16 bg-green-600 hover:bg-green-700"
        >
          <ArrowRight className="mr-2 h-5 w-5" />
          回答画面へ
        </Button>
      </CardContent>
    </Card>
  );
}
