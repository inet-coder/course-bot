import type { Composer } from 'grammy';
import {
  CB,
  technologyMenuKeyboard,
  technologyDetailKeyboard,
} from '../../keyboards/mainKeyboards';
import { courseRepository } from '../../../database/repositories/courseRepository';
import { technologyRepository } from '../../../database/repositories/contentRepository';
import type { BotContext } from '../../../types/context';

export function registerTechnologyHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.TECH_MENU, async (ctx) => {
    const course = await courseRepository.getActive();
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Faol kurs topilmadi', show_alert: true });
      return;
    }
    const technologies = await technologyRepository.listByCourse(course.id);

    await ctx.editMessageText(
      '💻 <b>TEXNOLOGIYALAR</b>\n\nBatafsil ma\'lumot olish uchun texnologiyani tanlang:',
      { parse_mode: 'HTML', reply_markup: technologyMenuKeyboard(technologies) },
    );
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(/^technology_(\d+)$/, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const tech = await technologyRepository.findById(id);
    if (!tech) {
      await ctx.answerCallbackQuery({ text: 'Texnologiya topilmadi' });
      return;
    }
    const usageList = tech.usage.split(',').map((u: string) => u.trim()).filter(Boolean);
    const text =
      `<b>${tech.name}</b>\n\n${tech.description}\n\n` +
      `<b>Qayerda ishlatiladi:</b>\n${usageList.map((u: string) => `• ${u}`).join('\n')}`;

    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: technologyDetailKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });
}
