import type { NextFunction } from 'grammy';
import { userRepository } from '../../database/repositories/userRepository';
import type { BotContext } from '../../types/context';
import { logger } from '../../utils/logger';

export async function userTrackingMiddleware(ctx: BotContext, next: NextFunction) {
  const from = ctx.from;
  if (from && !from.is_bot) {
    try {
      await userRepository.upsertFromTelegram({
        telegramId: from.id,
        username: from.username,
        firstName: from.first_name,
        lastName: from.last_name,
      });
    } catch (err) {
      logger.error({ err }, 'Foydalanuvchini saqlashda xatolik');
    }
  }
  await next();
}
