interface CourseLike {
  title: string;
}

export function buildWelcomeText(course: CourseLike, shortTitle: string, welcomeItems: string[]): string {
  return `🚀 <b>${shortTitle}</b>

Assalomu alaykum! 👋
Agar dasturlashni 0 dan boshlab o'rganib, zamonaviy dasturchi bo'lishni istasangiz, siz to'g'ri joydasiz.

Ushbu "<b>${course.title}</b>" kursida:
${welcomeItems.join('\n')}

gacha bosqichma-bosqich o'rganasiz.

Kurs davomida nazariya bilan birga amaliy mashg'ulotlar va real loyihalar qilinadi.

Quyidagi menyudan kerakli bo'limni tanlang 👇`;
}

export function buildAboutText(
  course: CourseLike & { description?: string | null },
  aboutBullets: string[],
): string {
  return `📚 <b>KURS HAQIDA</b>

🚀 <b>${course.title}</b>

${course.description ?? ''}

Kursda:
${aboutBullets.join('\n')}

o'rganiladi.

Kursning asosiy yondashuvi:
📖 Nazariya + 💻 Amaliyot + 🚀 Loyiha`;
}

export const benefitsText = `⭐ <b>KURS AFZALLIKLARI</b>

✅ 0 dan boshlanadi
✅ Nazariya va amaliyot birga
✅ Bosqichma-bosqich o'rgatiladi
✅ Real loyihalar qilinadi
✅ Portfolio uchun loyihalar
✅ Kelajakdagi yo'nalishga tayyorgarlik`;

export function buildOutcomesText(outcomeBullets: string[]): string {
  return `👨‍💻 <b>KURS YAKUNIDA NIMALARNI BILAMAN?</b>

Kurs yakunida quyidagi ko'nikmalar shakllanadi:

${outcomeBullets.join('\n')}
• Git/GitHub ishlatish

<i>Eslatma: natija sizning izlanishingiz va mashqqa sarflagan vaqtingizga bog'liq — kafolatlangan ish joyi yoki maosh haqida va'da bermaymiz.</i>`;
}
