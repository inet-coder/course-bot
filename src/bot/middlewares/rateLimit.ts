import type { NextFunction } from 'grammy';
import type { BotContext } from '../../types/context';

const WINDOW_MS = 2000;
const MAX_ACTIONS = 5;

const hits = new Map<number, number[]>();

export async function rateLimitMiddleware(ctx: BotContext, next: NextFunction) {
  const userId = ctx.from?.id;
  if (!userId) {
    await next();
    return;
  }

  const now = Date.now();
  const timestamps = (hits.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(userId, timestamps);

  if (timestamps.length > MAX_ACTIONS) {
    if (ctx.callbackQuery) {
      await ctx.answerCallbackQuery({ text: '⏳ Biroz sekinroq, iltimos.' });
    }
    return;
  }

  await next();
}
