import type { Composer } from 'grammy';
import { Keyboard } from 'grammy';
import { CB, backKeyboard } from '../../keyboards/mainKeyboards';
import { confirmApplicationKeyboard } from '../../keyboards/applyKeyboards';
import type { BotContext } from '../../../types/context';
import { nameSchema, phoneSchema, safeParseAge, normalizePhone } from '../../../utils/validation';
import { applicationService } from '../../../services/applicationService';
import { logger } from '../../../utils/logger';
import type { Bot } from 'grammy';

const removeKeyboard = { remove_keyboard: true } as const;

export function registerApplyStartHandler(composer: Composer<BotContext>) {
  composer.callbackQuery(CB.APPLY, async (ctx) => {
    ctx.session.step = 'APPLY_NAME';
    ctx.session.draft = {};
    await ctx.editMessageText(
      '📝 <b>Kursga yozilish</b>\n\nKeling, tanishib olamiz.\n\n1️⃣ Ismingizni kiriting:',
      { parse_mode: 'HTML' },
    );
    await ctx.answerCallbackQuery();
  });
}

export function registerApplyMessageHandler(composer: Composer<BotContext>, bot: Bot<BotContext>) {
  composer.on('message', async (ctx, next) => {
    const step = ctx.session.step;
    if (step === 'IDLE') return next();

    switch (step) {
      case 'APPLY_NAME': {
        const raw = ctx.message.text?.trim();
        const parsed = raw ? nameSchema.safeParse(raw) : null;
        if (!parsed || !parsed.success) {
          await ctx.reply('⚠️ Iltimos, to\'g\'ri ism kiriting (kamida 2 harf).');
          return;
        }
        ctx.session.draft.name = parsed.data;
        ctx.session.step = 'APPLY_PHONE';
        await ctx.reply(
          '2️⃣ Telefon raqamingizni yuboring (tugma orqali yoki qo\'lda yozing):',
          { reply_markup: new Keyboard().requestContact('📞 Telefon raqamni yuborish').resized().oneTime() },
        );
        return;
      }

      case 'APPLY_PHONE': {
        const raw = ctx.message.contact?.phone_number ?? ctx.message.text?.trim();
        const normalized = raw ? normalizePhone(raw) : '';
        const parsed = phoneSchema.safeParse(normalized);
        if (!parsed.success) {
          await ctx.reply('⚠️ Telefon raqam formati noto\'g\'ri. Masalan: +998901234567');
          return;
        }
        ctx.session.draft.phone = parsed.data;
        ctx.session.step = 'APPLY_AGE';
        await ctx.reply('3️⃣ Yoshingizni kiriting:', { reply_markup: removeKeyboard });
        return;
      }

      case 'APPLY_AGE': {
        const age = safeParseAge(ctx.message.text ?? '');
        if (age === null || age < 10 || age > 100) {
          await ctx.reply('⚠️ Iltimos, to\'g\'ri yosh kiriting (masalan: 20).');
          return;
        }
        ctx.session.draft.age = age;
        ctx.session.step = 'APPLY_EXPERIENCE';
        await ctx.reply('4️⃣ Dasturlash bo\'yicha tajribangiz bormi? (Bor / Yo\'q / qisqacha yozing)');
        return;
      }

      case 'APPLY_EXPERIENCE': {
        const text = ctx.message.text?.trim();
        if (!text) {
          await ctx.reply('⚠️ Iltimos, matn ko\'rinishida javob bering.');
          return;
        }
        ctx.session.draft.experience = text.slice(0, 300);
        ctx.session.step = 'APPLY_GOAL';
        await ctx.reply('5️⃣ Qaysi maqsadda dasturlashni o\'rganmoqchisiz?');
        return;
      }

      case 'APPLY_GOAL': {
        const text = ctx.message.text?.trim();
        if (!text) {
          await ctx.reply('⚠️ Iltimos, matn ko\'rinishida javob bering.');
          return;
        }
        ctx.session.draft.goal = text.slice(0, 300);
        ctx.session.step = 'APPLY_SOURCE';
        await ctx.reply('6️⃣ Kurs haqida qayerdan eshitdingiz? (Instagram / Telegram / Do\'stim / boshqa)');
        return;
      }

      case 'APPLY_SOURCE': {
        const text = ctx.message.text?.trim();
        if (!text) {
          await ctx.reply('⚠️ Iltimos, matn ko\'rinishida javob bering.');
          return;
        }
        ctx.session.draft.source = text.slice(0, 100);
        ctx.session.step = 'CONFIRM_APPLICATION';

        const d = ctx.session.draft;
        const summary =
          '📋 <b>Arizangizni tekshiring:</b>\n\n' +
          `👤 Ism: ${d.name}\n` +
          `📞 Telefon: ${d.phone}\n` +
          `🎂 Yosh: ${d.age}\n` +
          `💻 Tajriba: ${d.experience}\n` +
          `🎯 Maqsad: ${d.goal}\n` +
          `📢 Manba: ${d.source}\n\n` +
          'Hammasi to\'g\'rimi?';

        await ctx.reply(summary, { parse_mode: 'HTML', reply_markup: confirmApplicationKeyboard() });
        return;
      }

      default:
        return next();
    }
  });

  composer.callbackQuery('apply_confirm', async (ctx) => {
    if (ctx.session.step !== 'CONFIRM_APPLICATION' || !ctx.from) {
      await ctx.answerCallbackQuery();
      return;
    }

    try {
      const { application } = await applicationService.submit(ctx.from.id, ctx.session.draft);
      await applicationService.notifyAdmins(bot, application.id);

      ctx.session.step = 'IDLE';
      ctx.session.draft = {};

      await ctx.editMessageText(
        '✅ <b>Arizangiz qabul qilindi!</b>\n\nTez orada administrator siz bilan bog\'lanadi.',
        { parse_mode: 'HTML', reply_markup: backKeyboard() },
      );
    } catch (err) {
      logger.error({ err }, 'Ariza yaratishda xatolik');
      await ctx.editMessageText('⚠️ Texnik xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko\'ring.', {
        reply_markup: backKeyboard(),
      });
    }
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery('apply_cancel', async (ctx) => {
    ctx.session.step = 'IDLE';
    ctx.session.draft = {};
    await ctx.editMessageText('❌ Ariza bekor qilindi.', { reply_markup: backKeyboard() });
    await ctx.answerCallbackQuery();
  });
}
