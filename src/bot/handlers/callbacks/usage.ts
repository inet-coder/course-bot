import type { Composer } from 'grammy';
import { usageAreas } from '../../../content/usage';
import { CB, usageMenuKeyboard, usageDetailKeyboard } from '../../keyboards/mainKeyboards';
import type { BotContext } from '../../../types/context';

export function registerUsageHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.USAGE_MENU, async (ctx) => {
    await ctx.editMessageText(
      '🌍 <b>QAYERLARDA ISHLATILADI?</b>\n\nSoha tanlang:',
      { parse_mode: 'HTML', reply_markup: usageMenuKeyboard() },
    );
    await ctx.answerCallbackQuery();
  });

  for (const area of usageAreas) {
    composer.callbackQuery(`usage_${area.key}`, async (ctx) => {
      const lines: string[] = [];
      if (area.stack.frontend) lines.push(`🎨 Frontend: ${area.stack.frontend}`);
      if (area.stack.backend) lines.push(`⚙️ Backend: ${area.stack.backend}`);
      if (area.stack.database) lines.push(`🗄 Database: ${area.stack.database}`);
      if (area.stack.note) lines.push(`\n${area.stack.note}`);

      const text = `${area.emoji} <b>${area.name}</b>\n\n${lines.join('\n')}`;
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: usageDetailKeyboard(),
      });
      await ctx.answerCallbackQuery();
    });
  }
}
