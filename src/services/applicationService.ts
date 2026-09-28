import type { Bot } from 'grammy';
import { applicationRepository } from '../database/repositories/applicationRepository';
import { userRepository } from '../database/repositories/userRepository';
import { adminRepository } from '../database/repositories/contentRepository';
import { applicationDecisionKeyboard } from '../bot/keyboards/applyKeyboards';
import { logger } from '../utils/logger';
import type { BotContext } from '../types/context';
import type { ApplyDraft } from '../types/context';

export const applicationService = {
  async submit(telegramId: number, draft: ApplyDraft) {
    const user = await userRepository.findByTelegramId(telegramId);
    if (!user) throw new Error('User topilmadi');

    const application = await applicationRepository.create({
      userId: user.id,
      name: draft.name ?? '',
      phone: draft.phone ?? '',
      age: draft.age,
      experience: draft.experience,
      goal: draft.goal,
      source: user.source,
    });

    return { application, user };
  },

  async notifyAdmins(bot: Bot<BotContext>, applicationId: number) {
    const application = await applicationRepository.findById(applicationId);
    if (!application) return;

    const admins = await adminRepository.listAll();
    const text =
      `📝 <b>YANGI KURS ARIZASI</b>\n\n` +
      `👤 Ism: ${application.name}\n` +
      `📞 Telefon: ${application.phone}\n` +
      `🎂 Yosh: ${application.age ?? '—'}\n` +
      `💻 Tajriba: ${application.experience ?? '—'}\n` +
      `🎯 Maqsad: ${application.goal ?? '—'}\n` +
      `📢 Manba: ${application.source}\n` +
      `🆔 Telegram ID: ${application.user.telegramId}\n` +
      `Username: ${application.user.username ? '@' + application.user.username : '—'}`;

    for (const admin of admins) {
      try {
        await bot.api.sendMessage(Number(admin.telegramId), text, {
          parse_mode: 'HTML',
          reply_markup: applicationDecisionKeyboard(application.id),
        });
      } catch (err) {
        logger.warn({ err, adminId: admin.telegramId.toString() }, 'Adminga xabar yuborib bo\'lmadi');
      }
    }
  },
};
