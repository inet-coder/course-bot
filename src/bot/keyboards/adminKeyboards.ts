import { InlineKeyboard } from 'grammy';

export const ADMIN_CB = {
  PANEL: 'admin_panel',
  STATS: 'admin_statistics',
  APPLICATIONS: 'admin_applications',
  APPLICATIONS_PENDING: 'admin_apps_pending',
  APPLICATIONS_ACCEPTED: 'admin_apps_accepted',
  APPLICATIONS_REJECTED: 'admin_apps_rejected',
  USERS: 'admin_users',
  BROADCAST: 'admin_broadcast',
  SETTINGS: 'admin_settings',
  COURSES: 'admin_courses',
} as const;

export function adminMenuKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('📊 Statistika', ADMIN_CB.STATS)
    .text('📝 Arizalar', ADMIN_CB.APPLICATIONS)
    .row()
    .text('👥 Foydalanuvchilar', ADMIN_CB.USERS)
    .text('📢 Broadcast', ADMIN_CB.BROADCAST)
    .row()
    .text('📚 Kurslar', ADMIN_CB.COURSES)
    .text('⚙️ Sozlamalar', ADMIN_CB.SETTINGS);
}

export function coursesListKeyboard(courses: { id: number; title: string; isActive: boolean }[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  courses.forEach((course) => {
    const label = `${course.isActive ? '✅' : '⬜️'} ${course.title}`;
    kb.text(label, `admin_course_${course.id}`).row();
  });
  kb.text('⬅️ Orqaga', ADMIN_CB.PANEL);
  return kb;
}

export function courseDetailKeyboard(courseId: number, isActive: boolean): InlineKeyboard {
  const kb = new InlineKeyboard();
  if (!isActive) {
    kb.text('✅ Faol qilish', `admin_course_activate_${courseId}`).row();
  } else {
    kb.text('✅ Hozir faol', 'noop').row();
  }
  kb.text('⬅️ Orqaga', ADMIN_CB.COURSES);
  return kb;
}

export function applicationsFilterKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🕐 Kutilayotgan', ADMIN_CB.APPLICATIONS_PENDING)
    .text('✅ Qabul qilingan', ADMIN_CB.APPLICATIONS_ACCEPTED)
    .row()
    .text('❌ Rad etilgan', ADMIN_CB.APPLICATIONS_REJECTED)
    .row()
    .text('⬅️ Orqaga', ADMIN_CB.PANEL);
}

export function adminBackKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text('⬅️ Admin panel', ADMIN_CB.PANEL);
}
