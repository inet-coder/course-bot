import type { Composer } from 'grammy';
import { requireAdmin } from '../../middlewares/adminAuth';
import { courseRepository } from '../../../database/repositories/courseRepository';
import type { BotContext } from '../../../types/context';

async function getActiveOrWarn(ctx: BotContext) {
  const course = await courseRepository.getActive();
  if (!course) {
    await ctx.reply('⚠️ Faol kurs topilmadi. Avval "📚 Kurslar" bo\'limidan bitta kursni faol qiling.');
    return null;
  }
  return course;
}

export function registerAdminSettingsHandlers(composer: Composer<BotContext>) {
  composer.command('setprice', requireAdmin, async (ctx) => {
    const value = ctx.match?.toString().trim();
    if (!value) {
      await ctx.reply('Foydalanish: /setprice 500000');
      return;
    }
    const course = await getActiveOrWarn(ctx);
    if (!course) return;
    await courseRepository.update(course.id, { price: value });
    await ctx.reply(`✅ "${course.title}" narxi yangilandi: ${value}`);
  });

  composer.command('setduration', requireAdmin, async (ctx) => {
    const value = ctx.match?.toString().trim();
    if (!value) {
      await ctx.reply('Foydalanish: /setduration 4 oy');
      return;
    }
    const course = await getActiveOrWarn(ctx);
    if (!course) return;
    await courseRepository.update(course.id, { duration: value });
    await ctx.reply(`✅ "${course.title}" davomiyligi yangilandi: ${value}`);
  });

  composer.command('setdate', requireAdmin, async (ctx) => {
    const value = ctx.match?.toString().trim();
    if (!value) {
      await ctx.reply('Foydalanish: /setdate 2026-09-01');
      return;
    }
    const course = await getActiveOrWarn(ctx);
    if (!course) return;
    await courseRepository.update(course.id, { startDate: value });
    await ctx.reply(`✅ "${course.title}" boshlanish sanasi yangilandi: ${value}`);
  });

  composer.command('setphone', requireAdmin, async (ctx) => {
    const value = ctx.match?.toString().trim();
    if (!value) {
      await ctx.reply('Foydalanish: /setphone +998901234567');
      return;
    }
    const course = await getActiveOrWarn(ctx);
    if (!course) return;
    await courseRepository.update(course.id, { phone: value });
    await ctx.reply(`✅ "${course.title}" telefon raqami yangilandi: ${value}`);
  });

  composer.command('settelegram', requireAdmin, async (ctx) => {
    const value = ctx.match?.toString().trim();
    if (!value) {
      await ctx.reply('Foydalanish: /settelegram @username');
      return;
    }
    const course = await getActiveOrWarn(ctx);
    if (!course) return;
    await courseRepository.update(course.id, { telegram: value });
    await ctx.reply(`✅ "${course.title}" telegram yangilandi: ${value}`);
  });
}
