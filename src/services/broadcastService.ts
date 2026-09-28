import type { Bot } from 'grammy';
import { userRepository } from '../database/repositories/userRepository';
import { logger } from '../utils/logger';
import type { BotContext } from '../types/context';

const DELAY_MS = 50; // ~20 xabar/soniya — Telegram flood limitidan xavfsiz

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface BroadcastResult {
  total: number;
  sent: number;
  blocked: number;
  failed: number;
}

export const broadcastService = {
  async sendToAll(
    bot: Bot<BotContext>,
    sourceChatId: number,
    sourceMessageId: number,
  ): Promise<BroadcastResult> {
    const ids = await userRepository.listActiveTelegramIds();
    const result: BroadcastResult = { total: ids.length, sent: 0, blocked: 0, failed: 0 };

    for (const telegramId of ids) {
      try {
        await bot.api.copyMessage(Number(telegramId), sourceChatId, sourceMessageId);
        result.sent += 1;
      } catch (err: any) {
        const description: string = err?.description ?? '';
        if (description.includes('blocked') || description.includes('deactivated')) {
          result.blocked += 1;
          await userRepository.setBlocked(Number(telegramId), true).catch(() => undefined);
        } else {
          result.failed += 1;
          logger.warn({ err, telegramId: telegramId.toString() }, 'Broadcast xabari yuborilmadi');
        }
      }
      await sleep(DELAY_MS);
    }

    return result;
  },
};
