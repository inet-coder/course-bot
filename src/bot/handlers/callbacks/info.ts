import type { Composer } from 'grammy';
import { projects } from '../../../content/projects';
import { teacherText } from '../../../content/faq';
import { CB, backKeyboard, contactKeyboard } from '../../keyboards/mainKeyboards';
import { courseRepository } from '../../../database/repositories/courseRepository';
import type { BotContext } from '../../../types/context';

export function registerInfoHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.PROJECTS, async (ctx) => {
    const text =
      '🚀 <b>REAL LOYIHALAR</b>\n\nKurs davomida quyidagi loyihalar qilinadi:\n\n' +
      projects
        .map((p) => {
          const stack = [
            p.frontend ? `Frontend: ${p.frontend}` : null,
            p.backend ? `Backend: ${p.backend}` : null,
            p.database ? `Database: ${p.database}` : null,
          ]
            .filter(Boolean)
            .join(' | ');
          return (
            `${p.emoji} <b>${p.title}</b>\n` +
            (stack ? `${stack}\n` : '') +
            p.features.map((f) => `• ${f}`).join('\n')
          );
        })
        .join('\n\n');

    await ctx.editMessageText(text, { parse_mode: 'HTML', reply_markup: backKeyboard() });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.TEACHER, async (ctx) => {
    await ctx.editMessageText(teacherText, { parse_mode: 'HTML', reply_markup: backKeyboard() });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.PRICE, async (ctx) => {
    const course = await courseRepository.getActive();
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Faol kurs topilmadi', show_alert: true });
      return;
    }
    const text =
      `💰 <b>KURS NARXI</b>\n\n` +
      `📚 Kurs: ${course.title}\n` +
      `💰 Kurs narxi: ${course.price || 'Tez orada e\'lon qilinadi'}\n` +
      `⏱ Davomiyligi: ${course.duration || '—'}\n` +
      `📅 Boshlanish sanasi: ${course.startDate || '—'}\n` +
      `📍 Format: ${course.format || course.location || '—'}`;

    const { InlineKeyboard } = await import('grammy');
    const kb = new InlineKeyboard()
      .text('📝 Kursga yozilish', CB.APPLY)
      .row()
      .text('⬅️ Orqaga', CB.MAIN);

    await ctx.editMessageText(text, { parse_mode: 'HTML', reply_markup: kb });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.CONTACT, async (ctx) => {
    const course = await courseRepository.getActive();
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Faol kurs topilmadi', show_alert: true });
      return;
    }
    const text =
      `📞 <b>BOG'LANISH</b>\n\n` +
      `📞 Telefon: ${course.phone || '—'}\n` +
      `📱 Telegram: ${course.telegram || '—'}\n` +
      `🌐 Website: ${course.website || '—'}\n` +
      `📍 Manzil: ${course.address || '—'}`;

    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: contactKeyboard({
        telegram: course.telegram ? `https://t.me/${course.telegram.replace('@', '')}` : undefined,
        website: course.website ?? undefined,
      }),
    });
    await ctx.answerCallbackQuery();
  });
}
