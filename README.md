# ことば落とし（Word Drop）

会話の中にお題ワードを自然に紛れ込ませるボードゲーム「ことば落とし」のブラウザ版進行管理ツールです。

## 概要

このアプリケーションは、会話型ボードゲーム「ことば落とし」のゲーム進行を補助するシンプルなMVPです。
音声・チャット機能は含まれておらず、実際の会話は現実世界で行うことを想定しています。

## ゲームの流れ

1. **お題確認画面**: 親プレイヤーがランダムにお題ワードを引く
2. **トークタイム画面**: 3分間のタイマーで会話時間を管理
3. **結果発表画面**: お題を公開し、次のラウンドへ

## 起動方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. 本番ビルド

```bash
npm run build
npm start
```

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **状態管理**: React Hooks (useState)

## フォルダ構成

```
word-drop/
├── app/
│   ├── data/
│   │   └── words.ts          # お題ワードデータ（164個）
│   ├── layout.tsx             # ルートレイアウト
│   ├── page.tsx               # メインページ（状態管理・画面切り替え）
│   └── globals.css            # グローバルスタイル
├── components/
│   ├── ui/                    # shadcn/uiコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── alert.tsx
│   ├── TopicScreen.tsx        # お題確認画面
│   ├── TalkTimeScreen.tsx     # トークタイム画面（タイマー機能）
│   └── ResultScreen.tsx       # 結果発表画面
├── lib/
│   └── utils.ts               # ユーティリティ関数
└── README.md
```

## 主要コンポーネントの役割

### `app/page.tsx`
- ゲーム全体の状態管理
- 3つの画面（topic / talk / result）の切り替え
- お題ワードの管理

### `components/TopicScreen.tsx`
- お題ワードのランダム抽選
- お題の表示/非表示トグル機能
- トークタイムへの遷移

### `components/TalkTimeScreen.tsx`
- 3分間のカウントダウンタイマー
- 開始・一時停止・リセット機能
- プログレスバー表示
- 結果発表への遷移

### `components/ResultScreen.tsx`
- お題ワードの公開
- 勝敗判定の説明
- 次のラウンドへの遷移

## 機能

### 実装済み機能

- お題ワードのランダム抽選（164個のワードから）
- お題の表示/非表示切り替え
- 3分タイマー（開始・一時停止・リセット）
- レスポンシブデザイン（スマホ・タブレット・PC対応）
- 大きく見やすいUI（ボタン・文字サイズ）

### 今後追加できる機能（任意）

- ダークモード対応
- タイマー時間のカスタマイズ
- ラウンド履歴の記録
- 勝敗カウンター
- カスタムお題の追加機能

## お題ワードについて

`app/data/words.ts`に164個の日本語ワードが定義されています。
カテゴリは以下の通りです：

- 食べ物・飲み物
- 場所
- 乗り物・交通
- 電化製品・道具
- 動物
- 天気・自然
- 季節・行事
- 趣味・娯楽
- 仕事・学習
- 日常生活
- 感情・状態
- その他

新しいお題を追加する場合は、`words`配列に文字列を追加してください。

## カスタマイズ

### タイマー時間の変更

`components/TalkTimeScreen.tsx`の`INITIAL_TIME`定数を変更してください。

```typescript
const INITIAL_TIME = 180; // 3分 = 180秒
```

### お題ワードの追加

`app/data/words.ts`の`words`配列に新しいワードを追加してください。

```typescript
export const words = [
  "りんご",
  "バナナ",
  // ... 新しいワードを追加
  "あなたのワード",
] as const;
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## クレジット

ことば落としは[Jelly Jelly Games](https://jelly2games.com)によるボードゲームです。
