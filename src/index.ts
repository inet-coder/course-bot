import { createBot } from './bot/bot';
import { prisma } from './database/prisma';
import { adminRepository } from './database/repositories/contentRepository';
import { adminIds } from './config/env';
import { logger } from './utils/logger';

async function main() {
  await prisma.$connect();
  logger.info('✅ Database ulandi');

  await adminRepository.ensureSeeded(adminIds);

  const bot = createBot();

  process.once('SIGINT', () => shutdown(bot, 'SIGINT'));
  process.once('SIGTERM', () => shutdown(bot, 'SIGTERM'));

  await bot.start({
    onStart: (info) => {
      logger.info({ username: info.username }, '🚀 Bot ishga tushdi');
    },
  });
}

async function shutdown(bot: ReturnType<typeof createBot>, signal: string) {
  logger.info({ signal }, 'Bot to\'xtatilmoqda...');
  await bot.stop();
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  logger.error({ err }, '❌ Botni ishga tushirishda xatolik');
  process.exit(1);
});
