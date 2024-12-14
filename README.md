<div align="center">
  <img src="https://raw.githubusercontent.com/Sunwood-ai-labs/omikuji-mcp-server/refs/heads/master/assets/header.svg" alt="Omikuji MCP Server" width="800" />
</div>

# 🎋 おみくじMCPサーバー

Model Context Protocol (MCP) を使用したおみくじサーバーです。運勢を占い、詳細な解説とアドバイスを提供します。

> **注意**: このパッケージは [roo-cline](https://github.com/roovet/roo-cline) を使用したAI駆動開発の試験的な実装です。実験的な機能を含んでおり、予期せぬ動作が発生する可能性があります。

## 機能

- ランダムなおみくじ結果（大吉、中吉、小吉、末吉、凶）
- 運勢の詳細な説明
- 今日のアドバイス
- 名前を指定してのおみくじ機能

## インストール

```bash
# npmからインストール
npm install @sunwood-ai-labs/omikuji-mcp-server

# または、GitHubからクローン
git clone https://github.com/Sunwood-ai-labs/omikuji-mcp-server.git
cd omikuji-mcp-server
npm install
npm run build
```

## 設定

MCPの設定ファイルに以下を追加してください：

```json
{
  "mcpServers": {
    "omikuji": {
      "command": "node",
      "args": ["node_modules/@sunwood-ai-labs/omikuji-mcp-server/build/index.js"]
    }
  }
}
```

## 使用方法

MCPツール `draw_fortune` を使用して、以下のように呼び出すことができます：

```json
// 名前を指定する場合
{
  "name": "あなたの名前"
}

// 名前を省略する場合は引数なしで呼び出し可能
```

## 開発背景

このパッケージは、roo-clineを使用したAI駆動開発の実験的な実装として作成されました。roo-clineは、AIを活用したコード生成と開発支援を提供するツールです。

### AI駆動開発の特徴

- 🤖 AIによるコード生成
- 🔄 インタラクティブな開発プロセス
- 📚 自然言語による機能実装
- 🛠 自動的なテストとエラー処理

## 注意事項

1. このパッケージは実験的な実装であり、予期せぬ動作が発生する可能性があります
2. 本番環境での使用は推奨されません
3. バグや問題を発見した場合は、GitHubのIssuesでご報告ください

## ライセンス

MIT

## 作者

Sunwood AI Labs
