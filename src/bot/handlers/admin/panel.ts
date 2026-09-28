import type { Composer } from 'grammy';
import { adminMenuKeyboard, ADMIN_CB } from '../../keyboards/adminKeyboards';
import { requireAdmin } from '../../middlewares/adminAuth';
import { statsService } from '../../../services/statsService';
import type { BotContext } from '../../../types/context';

export function registerAdminPanelHandlers(composer: Composer<BotContext>) {
  composer.command('admin', requireAdmin, async (ctx) => {
    await ctx.reply('🔐 <b>ADMIN PANEL</b>', { parse_mode: 'HTML', reply_markup: adminMenuKeyboard() });
  });

  composer.callbackQuery(ADMIN_CB.PANEL, requireAdmin, async (ctx) => {
    await ctx.editMessageText('🔐 <b>ADMIN PANEL</b>', {
      parse_mode: 'HTML',
      reply_markup: adminMenuKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(ADMIN_CB.STATS, requireAdmin, async (ctx) => {
    const text = await statsService.buildOverview();
    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: adminMenuKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });
}
