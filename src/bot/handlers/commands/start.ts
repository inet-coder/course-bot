import type { Composer } from 'grammy';
import { buildWelcomeText } from '../../../content/course';
import { mainMenuKeyboard } from '../../keyboards/mainKeyboards';
import { userRepository } from '../../../database/repositories/userRepository';
import { courseRepository } from '../../../database/repositories/courseRepository';
import { courseSeeds } from '../../../content/courseSeeds';
import type { BotContext } from '../../../types/context';
import { logger } from '../../../utils/logger';

const SOURCE_MAP: Record<string, 'INSTAGRAM' | 'TELEGRAM' | 'WEBSITE' | 'FRIEND' | 'OTHER'> = {
  instagram: 'INSTAGRAM',
  telegram: 'TELEGRAM',
  website: 'WEBSITE',
  friend: 'FRIEND',
};

export function registerStartHandler(composer: Composer<BotContext>) {
  composer.command('start', async (ctx) => {
    const payload = ctx.match?.toString().trim().toLowerCase();
    const source = payload ? SOURCE_MAP[payload] ?? 'OTHER' : 'OTHER';

    if (ctx.from) {
      await userRepository.upsertFromTelegram({
        telegramId: ctx.from.id,
        username: ctx.from.username,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        source,
      });
      logger.info({ telegramId: ctx.from.id, source }, 'Foydalanuvchi botni ishga tushirdi');
    }

    ctx.session.step = 'IDLE';
    ctx.session.draft = {};

    const course = await courseRepository.getActive();
    if (!course) {
      await ctx.reply('⚠️ Hozircha faol kurs sozlanmagan. Iltimos, birozdan keyin qayta urinib ko\'ring.');
      return;
    }
    const seed = courseSeeds.find((s) => s.key === course.key);
    const shortTitle = seed?.shortTitle ?? course.title.toUpperCase();
    const welcomeItems = seed?.welcomeItems ?? [];

    await ctx.reply(buildWelcomeText(course, shortTitle, welcomeItems), {
      parse_mode: 'HTML',
      reply_markup: mainMenuKeyboard(),
    });
  });
}

