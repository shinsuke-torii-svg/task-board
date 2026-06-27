# Claude Task Board

このドキュメントは、Claude Code がこのプロジェクトで作業する際のガイドラインを定義します。

## プロジェクト概要

Vite + React で構築したタスク管理ボードアプリケーション。

## デプロイ先

- **本番 URL**: https://shinsuke-torii-svg.github.io/task-board/
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
  - `main` ブランチへのプッシュで自動デプロイ

## 技術スタック

- **フレームワーク**: React 19
- **ビルドツール**: Vite 8
- **言語**: JavaScript (JSX)
- **スタイリング**: CSS Modules なし（単一の `App.css` + `index.css`）
- **状態管理**: React `useState` / `useRef` / `useEffect`（外部ライブラリなし）
- **永続化**: `localStorage`（キー: `task-board-tasks`）

## コンポーネント構成

現在はシングルコンポーネント構成。

```
src/
├── main.jsx      # エントリーポイント（React DOM マウントのみ）
├── App.jsx       # アプリ全体のロジックと UI
├── App.css       # App コンポーネントのスタイル
└── index.css     # グローバルリセット・body スタイル
```

## コンポーネント命名規約

- **ファイル名**: PascalCase（例: `TaskItem.jsx`, `AddTaskForm.jsx`）
- **コンポーネント関数名**: ファイル名と同一の PascalCase
- **CSS クラス名**: kebab-case（例: `.task-item`, `.add-btn`, `.board-title`）
- **定数**: UPPER_SNAKE_CASE（例: `STORAGE_KEY`）
- **イベントハンドラ**: `handle` プレフィックス（例: `handleKeyDown`, `handleSubmit`）

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # 本番ビルド
npm run preview # ビルド結果のプレビュー
```

## Git 運用ルール

**コードを変更するたびに、必ず GitHub にプッシュすること。**

### 手順

1. 変更をステージング: `git add <変更ファイル>`
2. コミット: `git commit -m "<メッセージ>"`
3. プッシュ: `git push origin <ブランチ名>`

### コミットメッセージの形式

```
<種別>: <変更内容の要約>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

種別:
- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト
- `chore`: その他の作業

### ブランチ戦略

- `main`: 本番ブランチ。直接コミット不可。
- `feature/<機能名>`: 新機能開発ブランチ。
- `fix/<バグ名>`: バグ修正ブランチ。

### 禁止事項

- `git push --force` を `main` ブランチに対して実行すること。
- `--no-verify` でフックをスキップすること（ユーザーの明示的な指示がある場合を除く）。

## 開発ガイドライン

- コメントは「なぜ（Why）」が非自明な場合のみ記述する。
- セキュリティ上の脆弱性（XSS、SQL インジェクション等）を導入しないこと。
- 必要以上の抽象化や将来の要件への対応は行わない。
