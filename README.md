# 🎋 おみくじMCPサーバー

Model Context Protocol (MCP) を使用したおみくじサーバーです。運勢を占い、詳細な解説とアドバイスを提供します。

## 機能

- ランダムなおみくじ結果（大吉、中吉、小吉、末吉、凶）
- 運勢の詳細な説明
- 今日のアドバイス
- 名前を指定してのおみくじ機能

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/omikuji-mcp-server.git
cd omikuji-mcp-server

# 依存関係のインストール
npm install

# ビルド
npm run build
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

## 設定

MCPの設定ファイルに以下を追加してください：

```json
{
  "mcpServers": {
    "omikuji": {
      "command": "node",
      "args": ["path/to/omikuji-server/build/index.js"]
    }
  }
}
```

## ライセンス

MIT

## 作者

[Your Name]
