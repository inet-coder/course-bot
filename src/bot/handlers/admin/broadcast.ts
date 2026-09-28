import type { Bot, Composer } from 'grammy';
import { ADMIN_CB, adminBackKeyboard } from '../../keyboards/adminKeyboards';
import { requireAdmin } from '../../middlewares/adminAuth';
import { broadcastService } from '../../../services/broadcastService';
import { userRepository } from '../../../database/repositories/userRepository';
import type { BotContext } from '../../../types/context';

export function registerAdminBroadcastHandlers(composer: Composer<BotContext>, bot: Bot<BotContext>) {
  composer.callbackQuery(ADMIN_CB.BROADCAST, requireAdmin, async (ctx) => {
    ctx.session.broadcast = { active: true, awaitingContent: true };
    await ctx.editMessageText(
      '📢 <b>Broadcast</b>\n\nYubormoqchi bo\'lgan xabaringizni yuboring (matn, rasm yoki video bo\'lishi mumkin). Bekor qilish uchun /cancel.',
      { parse_mode: 'HTML' },
    );
    await ctx.answerCallbackQuery();
  });

  composer.command('cancel', requireAdmin, async (ctx) => {
    if (ctx.session.broadcast.active) {
      ctx.session.broadcast = { active: false, awaitingContent: false };
      await ctx.reply('❌ Broadcast bekor qilindi.');
    }
  });

  // MUHIM: bu yerda requireAdmin ISHLATILMAYDI, chunki bu handler botga yozilgan
  // BARCHA xabarlarni tinglaydi (oddiy foydalanuvchilarniki ham). session.broadcast.active
  // faqat admin "📢 Broadcast" tugmasini bosgandan keyin true bo'ladi — shu yetarli himoya.
  composer.on('message', async (ctx, next) => {
    if (!ctx.session.broadcast.active || !ctx.session.broadcast.awaitingContent) {
      return next();
    }

    ctx.session.broadcast = { active: false, awaitingContent: false };
    await ctx.reply('📤 Yuborish boshlandi, biroz vaqt olishi mumkin...');

    const result = await broadcastService.sendToAll(bot, ctx.chat.id, ctx.message.message_id);

    await ctx.reply(
      `✅ <b>Broadcast yakunlandi</b>\n\n👥 Jami: ${result.total}\n✅ Yuborildi: ${result.sent}\n🚫 Bloklangan: ${result.blocked}\n⚠️ Xato: ${result.failed}`,
      { parse_mode: 'HTML', reply_markup: adminBackKeyboard() },
    );
  });

  composer.callbackQuery(ADMIN_CB.USERS, requireAdmin, async (ctx) => {
    const total = await userRepository.countAll();
    const bySource = await userRepository.countBySource();
    const lines = bySource
      .map((s: { source: string; _count: { source: number } }) => `• ${s.source}: ${s._count.source}`)
      .join('\n');

    await ctx.editMessageText(
      `👥 <b>FOYDALANUVCHILAR</b>\n\nJami: ${total}\n\n${lines || 'Ma\'lumot yo\'q'}`,
      { parse_mode: 'HTML', reply_markup: adminBackKeyboard() },
    );
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(ADMIN_CB.SETTINGS, requireAdmin, async (ctx) => {
    await ctx.editMessageText(
      '⚙️ <b>Sozlamalar</b>\n\nBuyruqlar <b>faol kurs</b>ga qo\'llanadi (avval "📚 Kurslar" bo\'limidan kerakli kursni faol qiling):\n\n' +
        '<code>/setprice 500000</code>\n' +
        '<code>/setduration 4 oy</code>\n' +
        '<code>/setdate 2026-09-01</code>\n' +
        '<code>/setphone +998901234567</code>\n' +
        '<code>/settelegram @username</code>',
      { parse_mode: 'HTML', reply_markup: adminBackKeyboard() },
    );
    await ctx.answerCallbackQuery();
  });
}
