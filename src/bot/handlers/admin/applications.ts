import type { Composer } from 'grammy';
import {
  ADMIN_CB,
  applicationsFilterKeyboard,
  adminBackKeyboard,
} from '../../keyboards/adminKeyboards';
import { requireAdmin } from '../../middlewares/adminAuth';
import { applicationRepository } from '../../../database/repositories/applicationRepository';
import type { BotContext } from '../../../types/context';
import type { ApplicationStatus } from '@prisma/client';

function formatApplication(app: any): string {
  return (
    `📝 <b>#${app.id}</b> — ${app.name}\n` +
    `📞 ${app.phone} | 🎂 ${app.age ?? '—'}\n` +
    `💻 ${app.experience ?? '—'}\n` +
    `🎯 ${app.goal ?? '—'}\n` +
    `📅 ${new Date(app.createdAt).toLocaleDateString('uz-UZ')}`
  );
}

async function renderList(status: ApplicationStatus) {
  const apps = await applicationRepository.listByStatus(status, 10, 0);
  if (apps.length === 0) return 'Bu bo\'limda arizalar yo\'q.';
  return apps.map(formatApplication).join('\n\n');
}

export function registerAdminApplicationHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(ADMIN_CB.APPLICATIONS, requireAdmin, async (ctx) => {
    await ctx.editMessageText('📝 <b>ARIZALAR</b>\n\nBo\'limni tanlang:', {
      parse_mode: 'HTML',
      reply_markup: applicationsFilterKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(ADMIN_CB.APPLICATIONS_PENDING, requireAdmin, async (ctx) => {
    const text = await renderList('PENDING');
    await ctx.editMessageText(`🕐 <b>Kutilayotgan arizalar</b>\n\n${text}`, {
      parse_mode: 'HTML',
      reply_markup: adminBackKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(ADMIN_CB.APPLICATIONS_ACCEPTED, requireAdmin, async (ctx) => {
    const text = await renderList('ACCEPTED');
    await ctx.editMessageText(`✅ <b>Qabul qilingan arizalar</b>\n\n${text}`, {
      parse_mode: 'HTML',
      reply_markup: adminBackKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(ADMIN_CB.APPLICATIONS_REJECTED, requireAdmin, async (ctx) => {
    const text = await renderList('REJECTED');
    await ctx.editMessageText(`❌ <b>Rad etilgan arizalar</b>\n\n${text}`, {
      parse_mode: 'HTML',
      reply_markup: adminBackKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  // Admin tomonidan yuborilgan ariza xabaridagi tugmalar: app_accept_<id>, app_reject_<id>
  composer.callbackQuery(/^app_accept_(\d+)$/, requireAdmin, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const app = await applicationRepository.setStatus(id, 'ACCEPTED');
    await ctx.editMessageText(`✅ Ariza #${app.id} qabul qilindi.`, { parse_mode: 'HTML' });
    await ctx.answerCallbackQuery({ text: 'Qabul qilindi' });
  });

  composer.callbackQuery(/^app_reject_(\d+)$/, requireAdmin, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const app = await applicationRepository.setStatus(id, 'REJECTED');
    await ctx.editMessageText(`❌ Ariza #${app.id} rad etildi.`, { parse_mode: 'HTML' });
    await ctx.answerCallbackQuery({ text: 'Rad etildi' });
  });

  composer.callbackQuery(/^app_contact_(\d+)$/, requireAdmin, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const app = await applicationRepository.findById(id);
    await ctx.answerCallbackQuery({
      text: app ? `📞 ${app.phone}` : 'Topilmadi',
      show_alert: true,
    });
  });
}
