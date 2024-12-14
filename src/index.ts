#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// おみくじの結果の型定義
type Fortune = '大吉' | '中吉' | '小吉' | '末吉' | '凶';

// おみくじの運勢の詳細
const fortuneDetails: Record<Fortune, string[]> = {
  '大吉': [
    '素晴らしい1日になるでしょう',
    '新しいチャンスが訪れます',
    '願い事が叶う日です',
    '全てが上手くいく予感です'
  ],
  '中吉': [
    '良い出会いがありそうです',
    '努力が実を結びます',
    '穏やかな1日になるでしょう',
    '小さな幸せが見つかります'
  ],
  '小吉': [
    'コツコツと進めば良い結果に',
    '焦らず着実に進みましょう',
    '周りの人に感謝する日です',
    '平凡な中に幸せがあります'
  ],
  '末吉': [
    '慎重に行動しましょう',
    '基本に立ち返ることが大切です',
    '謙虚な姿勢が吉となります',
    '一歩一歩確実に進むのが良いでしょう'
  ],
  '凶': [
    '落ち着いて行動しましょう',
    '今日は控えめに過ごすのが吉',
    '周りの意見に耳を傾けましょう',
    '無理は禁物です'
  ]
};

// アドバイスのリスト
const adviceList = [
  '深呼吸をして、リラックスすることを忘れずに',
  '周りの人への感謝の気持ちを忘れずに',
  '新しいことにチャレンジするのも良いでしょう',
  '基本を大切にする日にしましょう',
  '家族や友人との時間を大切にしましょう',
  '自分の気持ちに正直に向き合いましょう',
  '小さな目標から始めるのが良いでしょう',
  '今日という日を大切に過ごしましょう'
];

class OmikujiServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'omikuji-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'draw_fortune',
          description: 'おみくじを引いて運勢を占います',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'おみくじを引く人の名前（オプション）',
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'draw_fortune') {
        throw new Error(`Unknown tool: ${request.params.name}`);
      }

      const name = request.params.arguments?.name || '参拝者';
      const fortunes: Fortune[] = ['大吉', '中吉', '小吉', '末吉', '凶'];
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      const details = fortuneDetails[fortune];
      const detail = details[Math.floor(Math.random() * details.length)];
      const advice = adviceList[Math.floor(Math.random() * adviceList.length)];

      const result = `
🎋 ${name}さんの運勢

【結果】 ${fortune}

【運勢の詳細】
${detail}

【今日のアドバイス】
${advice}

おみくじの結果に一喜一憂せず、前向きな気持ちで過ごしましょう。
`;

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('おみくじMCPサーバーが起動しました');
  }
}

const server = new OmikujiServer();
server.run().catch(console.error);
