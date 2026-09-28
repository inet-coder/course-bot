import type { Composer } from 'grammy';
import { buildAboutText, benefitsText, buildOutcomesText } from '../../../content/course';
import {
  CB,
  courseAboutKeyboard,
  courseProgramKeyboard,
  stageDetailKeyboard,
  backKeyboard,
} from '../../keyboards/mainKeyboards';
import { courseRepository } from '../../../database/repositories/courseRepository';
import { stageRepository } from '../../../database/repositories/contentRepository';
import { courseSeeds } from '../../../content/courseSeeds';
import type { BotContext } from '../../../types/context';

async function requireActiveCourse(ctx: BotContext) {
  const course = await courseRepository.getActive();
  if (!course) {
    await ctx.answerCallbackQuery({ text: 'Faol kurs topilmadi', show_alert: true });
    return null;
  }
  return course;
}

export function registerCourseHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.COURSE_ABOUT, async (ctx) => {
    const course = await requireActiveCourse(ctx);
    if (!course) return;
    const seed = courseSeeds.find((s) => s.key === course.key);

    await ctx.editMessageText(buildAboutText(course, seed?.aboutBullets ?? []), {
      parse_mode: 'HTML',
      reply_markup: courseAboutKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.COURSE_PROGRAM, async (ctx) => {
    const course = await requireActiveCourse(ctx);
    if (!course) return;
    const stages = await stageRepository.listByCourse(course.id);

    await ctx.editMessageText(
      '🗺 <b>KURS DASTURI</b>\n\nQuyidagi bosqichlardan birini tanlang:',
      { parse_mode: 'HTML', reply_markup: courseProgramKeyboard(stages) },
    );
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.COURSE_OUTCOMES, async (ctx) => {
    const course = await requireActiveCourse(ctx);
    if (!course) return;
    const seed = courseSeeds.find((s) => s.key === course.key);

    await ctx.editMessageText(buildOutcomesText(seed?.outcomeBullets ?? []), {
      parse_mode: 'HTML',
      reply_markup: backKeyboard(CB.COURSE_ABOUT),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.BENEFITS, async (ctx) => {
    await ctx.editMessageText(benefitsText, { parse_mode: 'HTML', reply_markup: backKeyboard() });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(CB.COURSE_BENEFITS, async (ctx) => {
    await ctx.editMessageText(benefitsText, { parse_mode: 'HTML', reply_markup: backKeyboard() });
    await ctx.answerCallbackQuery();
  });

  // Bosqich detali: stage_<id>
  composer.callbackQuery(/^stage_(\d+)$/, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const stage = await stageRepository.findById(id);
    if (!stage) {
      await ctx.answerCallbackQuery({ text: 'Bosqich topilmadi' });
      return;
    }
    const topics = stage.topics.split('\n').filter(Boolean);
    const text = `<b>${stage.title}</b>\n\n${stage.intro}\n\n${topics.map((t: string) => `• ${t}`).join('\n')}`;

    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: stageDetailKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });
}
