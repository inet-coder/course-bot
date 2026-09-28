import { Bot, GrammyError, HttpError } from 'grammy';
import { env } from '../config/env';
import type { BotContext } from '../types/context';
import { logger } from '../utils/logger';

import { sessionMiddleware } from './middlewares/session';
import { userTrackingMiddleware } from './middlewares/userTracking';
import { rateLimitMiddleware } from './middlewares/rateLimit';

import { registerStartHandler } from './handlers/commands/start';
import { registerNavigationHandlers } from './handlers/callbacks/navigation';
import { registerCourseHandlers } from './handlers/callbacks/course';
import { registerTechnologyHandlers } from './handlers/callbacks/technology';
import { registerUsageHandlers } from './handlers/callbacks/usage';
import { registerInfoHandlers } from './handlers/callbacks/info';
import { registerFaqHandlers } from './handlers/callbacks/faq';
import { registerApplyStartHandler, registerApplyMessageHandler } from './handlers/apply/applyFlow';
import { registerAdminPanelHandlers } from './handlers/admin/panel';
import { registerAdminApplicationHandlers } from './handlers/admin/applications';
import { registerAdminBroadcastHandlers } from './handlers/admin/broadcast';
import { registerAdminSettingsHandlers } from './handlers/admin/settings';
import { registerAdminCourseHandlers } from './handlers/admin/courses';

export function createBot(): Bot<BotContext> {
  const bot = new Bot<BotContext>(env.BOT_TOKEN);

  bot.use(sessionMiddleware);
  bot.use(rateLimitMiddleware);
  bot.use(userTrackingMiddleware);

  registerStartHandler(bot);
  registerNavigationHandlers(bot);
  registerCourseHandlers(bot);
  registerTechnologyHandlers(bot);
  registerUsageHandlers(bot);
  registerInfoHandlers(bot);
  registerFaqHandlers(bot);

  registerApplyStartHandler(bot);

  registerAdminPanelHandlers(bot);
  registerAdminApplicationHandlers(bot);
  registerAdminBroadcastHandlers(bot, bot);
  registerAdminSettingsHandlers(bot);
  registerAdminCourseHandlers(bot);

  // Apply oqimidagi matn/kontakt xabarlarini eng oxirida ushlaymiz,
  // shunda admin/boshqa komandalar ustunlik qiladi.
  registerApplyMessageHandler(bot, bot);

  bot.catch((err) => {
    const ctx = err.ctx;
    const e = err.error;

    // Zararsiz holat: foydalanuvchi bir xil tugmani ketma-ket bossa Telegram shu xatoni qaytaradi.
    // Bu haqiqiy xatolik emas — log qilmaymiz va foydalanuvchiga xabar yubormaymiz.
    if (e instanceof GrammyError && e.description?.includes('message is not modified')) {
      ctx.answerCallbackQuery().catch(() => undefined);
      return;
    }

    logger.error({ err: e, updateId: ctx.update.update_id }, 'Bot xatoligi');

    if (e instanceof GrammyError) {
      logger.error({ description: e.description }, 'Telegram API xatoligi');
    } else if (e instanceof HttpError) {
      logger.error({ err: e }, 'HTTP xatoligi (Telegramga ulanishda muammo)');
    }

    ctx.reply('⚠️ Texnik xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko\'ring.').catch(() => undefined);
  });

  return bot;
}
