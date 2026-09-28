import type { Composer } from 'grammy';
import { CB, faqListKeyboard, backKeyboard } from '../../keyboards/mainKeyboards';
import { faqRepository } from '../../../database/repositories/contentRepository';
import type { BotContext } from '../../../types/context';

export function registerFaqHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.FAQ, async (ctx) => {
    const items = await faqRepository.list();
    const text =
      '❓ <b>Savol-javob</b>\n\nSizni qiziqtirgan savolni tanlang — darhol javobini olasiz:\n\n' +
      items.map((item: { question: string }, i: number) => `${i + 1}. ${item.question}`).join('\n');

    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: faqListKeyboard(items.length),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(/^faq_(\d+)$/, async (ctx) => {
    const index = Number(ctx.match?.[1]);
    const items = await faqRepository.list();
    const item = items[index];
    if (!item) {
      await ctx.answerCallbackQuery({ text: 'Savol topilmadi' });
      return;
    }
    await ctx.editMessageText(`❓ <b>${item.question}</b>\n\n${item.answer}`, {
      parse_mode: 'HTML',
      reply_markup: backKeyboard(CB.FAQ),
    });
    await ctx.answerCallbackQuery();
  });
}
