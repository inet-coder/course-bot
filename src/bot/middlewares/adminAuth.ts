import type { NextFunction } from 'grammy';
import { adminRepository } from '../../database/repositories/contentRepository';
import type { BotContext } from '../../types/context';
import { logger } from '../../utils/logger';

export async function requireAdmin(ctx: BotContext, next: NextFunction) {
  const telegramId = ctx.from?.id;
  if (!telegramId) return;

  const isAdmin = await adminRepository.isAdmin(telegramId);
  if (!isAdmin) {
    logger.warn({ telegramId }, 'Ruxsatsiz admin panelga kirishga urinish');
    if (ctx.callbackQuery) {
      await ctx.answerCallbackQuery({ text: '⛔️ Sizda ruxsat yo\'q', show_alert: true });
    } else {
      await ctx.reply('⛔️ Sizda bu buyruqdan foydalanish uchun ruxsat yo\'q.');
    }
    return;
  }

  await next();
}
