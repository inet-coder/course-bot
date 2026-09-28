import type { Composer } from 'grammy';
import {
  ADMIN_CB,
  coursesListKeyboard,
  courseDetailKeyboard,
  adminBackKeyboard,
} from '../../keyboards/adminKeyboards';
import { requireAdmin } from '../../middlewares/adminAuth';
import { courseRepository } from '../../../database/repositories/courseRepository';
import type { BotContext } from '../../../types/context';

export function registerAdminCourseHandlers(composer: Composer<BotContext>) {
  composer.callbackQuery(ADMIN_CB.COURSES, requireAdmin, async (ctx) => {
    const courses = await courseRepository.listAll();
    await ctx.editMessageText(
      '📚 <b>KURSLAR</b>\n\nFoydalanuvchilarga faqat ✅ belgili (faol) kurs ko\'rsatiladi. Boshqasini faol qilish uchun kursni tanlang:',
      { parse_mode: 'HTML', reply_markup: coursesListKeyboard(courses) },
    );
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(/^admin_course_(\d+)$/, requireAdmin, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const course = await courseRepository.getById(id);
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Kurs topilmadi' });
      return;
    }

    const text =
      `📚 <b>${course.title}</b>\n\n` +
      `Holat: ${course.isActive ? '✅ Faol (foydalanuvchilarga ko\'rinadi)' : '⬜️ Faol emas'}\n\n` +
      `💰 Narx: ${course.price || '—'}\n` +
      `⏱ Davomiyligi: ${course.duration || '—'}\n` +
      `📅 Boshlanish: ${course.startDate || '—'}\n\n` +
      `<i>Narx, sana va boshqa ma'lumotlarni o'zgartirish uchun kursni faol qilib, "⚙️ Sozlamalar" bo'limidagi buyruqlardan foydalaning.</i>`;

    await ctx.editMessageText(text, {
      parse_mode: 'HTML',
      reply_markup: courseDetailKeyboard(course.id, course.isActive),
    });
    await ctx.answerCallbackQuery();
  });

  composer.callbackQuery(/^admin_course_activate_(\d+)$/, requireAdmin, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    const course = await courseRepository.setActive(id);
    if (!course) {
      await ctx.answerCallbackQuery({ text: 'Kurs topilmadi' });
      return;
    }

    await ctx.editMessageText(
      `✅ <b>"${course.title}"</b> endi faol kurs sifatida foydalanuvchilarga ko'rsatiladi.`,
      { parse_mode: 'HTML', reply_markup: adminBackKeyboard() },
    );
    await ctx.answerCallbackQuery({ text: 'Faol kurs o\'zgartirildi ✅' });
  });

  composer.callbackQuery('noop', async (ctx) => {
    await ctx.answerCallbackQuery();
  });
}
