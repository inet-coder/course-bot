import type { Composer } from 'grammy';
import { buildWelcomeText } from '../../../content/course';
import { CB, mainMenuKeyboard } from '../../keyboards/mainKeyboards';
import { courseRepository } from '../../../database/repositories/courseRepository';
import { courseSeeds } from '../../../content/courseSeeds';
import type { BotContext } from '../../../types/context';

export function registerNavigationHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.MAIN, async (ctx) => {
    ctx.session.step = 'IDLE';

    const course = await courseRepository.getActive();
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Faol kurs topilmadi', show_alert: true });
      return;
    }
    const seed = courseSeeds.find((s) => s.key === course.key);
    const shortTitle = seed?.shortTitle ?? course.title.toUpperCase();
    const welcomeItems = seed?.welcomeItems ?? [];

    await ctx.editMessageText(buildWelcomeText(course, shortTitle, welcomeItems), {
      parse_mode: 'HTML',
      reply_markup: mainMenuKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });
}
