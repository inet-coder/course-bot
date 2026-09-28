import { InlineKeyboard } from 'grammy';
import { usageAreas } from '../../content/usage';

export const CB = {
  MAIN: 'back_main',
  COURSE_ABOUT: 'course_about',
  COURSE_PROGRAM: 'course_program',
  COURSE_OUTCOMES: 'course_outcomes',
  COURSE_BENEFITS: 'course_benefits',
  TECH_MENU: 'technology_menu',
  USAGE_MENU: 'usage_menu',
  PROJECTS: 'projects',
  BENEFITS: 'benefits',
  TEACHER: 'teacher',
  PRICE: 'price',
  APPLY: 'apply',
  FAQ: 'faq',
  CONTACT: 'contact',
  BACK_COURSE: 'back_course',
  ADMIN_PANEL: 'admin_panel',
} as const;

export function mainMenuKeyboard(): InlineKeyboard {
  return (
    new InlineKeyboard()
      // Kurs haqida ma'lumot blok — bir-biriga yaqin mavzular yonma-yon
      .text('📚 Kurs haqida', CB.COURSE_ABOUT)
      .text('🗺 Kurs dasturi', CB.COURSE_PROGRAM)
      .row()
      .text('💻 Texnologiyalar', CB.TECH_MENU)
      .text('🌍 Qayerda ishlatiladi', CB.USAGE_MENU)
      .row()
      // Ishonch/dalil blok
      .text('🚀 Real loyihalar', CB.PROJECTS)
      .text('⭐ Afzalliklar', CB.BENEFITS)
      .row()
      .text('👨‍💻 O\'qituvchi', CB.TEACHER)
      .text('❓ Savol-javob', CB.FAQ)
      .row()
      // Konversiya blok — narx va yozilish alohida ajralib tursin
      .text('💰 Kurs narxi', CB.PRICE)
      .row()
      .text('📝 Kursga yozilish', CB.APPLY)
      .row()
      .text('📞 Bog\'lanish', CB.CONTACT)
  );
}

export function backKeyboard(target: string = CB.MAIN, label = '⬅️ Orqaga'): InlineKeyboard {
  const kb = new InlineKeyboard().text(label, target);
  if (target !== CB.MAIN) kb.text('🏠 Bosh menyu', CB.MAIN);
  return kb;
}

export function courseAboutKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🗺 Kurs bosqichlari', CB.COURSE_PROGRAM)
    .text('👨‍💻 Nimalarni o\'rganaman?', CB.COURSE_OUTCOMES)
    .row()
    .text('📝 Kursga yozilish', CB.APPLY)
    .row()
    .text('⬅️ Orqaga', CB.MAIN);
}

export function courseProgramKeyboard(stages: { id: number; title: string }[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  stages.forEach((stage, index) => {
    // Har bir bosqich raqami + qisqa nomi — bir qatorda ikkitadan sig'adi
    const shortLabel = stage.title.replace(/^\d{2} — /, '');
    kb.text(`${index + 1}️⃣ ${shortLabel}`, `stage_${stage.id}`);
    if (index % 2 === 1) kb.row();
  });
  if (stages.length % 2 === 1) kb.row();
  return kb.text('⬅️ Orqaga', CB.MAIN);
}

export function stageDetailKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('⬅️ Orqaga', CB.COURSE_PROGRAM)
    .text('🏠 Bosh menyu', CB.MAIN);
}

export function technologyMenuKeyboard(technologies: { id: number; emoji: string; name: string }[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  technologies.forEach((tech, index) => {
    kb.text(`${tech.emoji} ${tech.name}`, `technology_${tech.id}`);
    if (index % 2 === 1) kb.row();
  });
  if (technologies.length % 2 === 1) kb.row();
  return kb.text('⬅️ Orqaga', CB.MAIN);
}

export function technologyDetailKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('⬅️ Orqaga', CB.TECH_MENU)
    .text('🏠 Bosh menyu', CB.MAIN);
}

export function usageMenuKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  usageAreas.forEach((area, index) => {
    kb.text(`${area.emoji} ${area.name}`, `usage_${area.key}`);
    if (index % 2 === 1) kb.row();
  });
  if (usageAreas.length % 2 === 1) kb.row();
  return kb.text('⬅️ Orqaga', CB.MAIN);
}

export function usageDetailKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text('⬅️ Orqaga', CB.USAGE_MENU).text('🏠 Bosh menyu', CB.MAIN);
}

export function faqListKeyboard(faqCount: number): InlineKeyboard {
  const kb = new InlineKeyboard();
  // Raqamlar 4 tadan qatorga — bosish uchun qulay, ko'z bilan sanash oson
  for (let i = 0; i < faqCount; i++) {
    kb.text(`${i + 1}`, `faq_${i}`);
    if ((i + 1) % 4 === 0) kb.row();
  }
  if (faqCount % 4 !== 0) kb.row();
  kb.text('⬅️ Orqaga', CB.MAIN);
  return kb;
}

export function contactKeyboard(links: { telegram?: string; website?: string }): InlineKeyboard {
  const kb = new InlineKeyboard();
  // Havolalar bo'lsa yonma-yon, keyin orqaga tugmasi alohida qatorda
  if (links.telegram) kb.url('💬 Telegram', links.telegram);
  if (links.website) kb.url('🌐 Web', links.website);
  if (links.telegram || links.website) kb.row();
  kb.text('⬅️ Orqaga', CB.MAIN);
  return kb;
}
