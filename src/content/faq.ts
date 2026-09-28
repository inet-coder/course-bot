export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultFaq: FaqItem[] = [
  { question: 'Kurs kimlar uchun?', answer: 'Dasturlashni 0 dan o\'rganib, Full Stack Web Developer bo\'lishni istagan har bir kishi uchun.' },
  { question: 'Dasturlashni bilmasam bo\'ladimi?', answer: 'Ha, kurs aynan boshlang\'ich darajadan boshlanadi.' },
  { question: 'Yosh chegarasi bormi?', answer: 'Qat\'iy yosh chegarasi yo\'q, lekin mustaqil o\'rganish qobiliyati talab qilinadi.' },
  { question: 'Kompyuter kerakmi?', answer: 'Ha, dasturlash uchun noutbuk yoki kompyuter kerak bo\'ladi.' },
  { question: 'Kurs qancha davom etadi?', answer: 'Davomiylik "Kurs narxi" bo\'limida ko\'rsatilgan.' },
  { question: 'Qaysi texnologiyalar o\'rgatiladi?', answer: 'JavaScript, HTML, CSS, React.js, Node.js, Express.js, API va Database.' },
  { question: 'Online yoki offline?', answer: 'Format "Kurs narxi" bo\'limida ko\'rsatiladi.' },
  { question: 'Kurs narxi qancha?', answer: '"💰 Kurs narxi" bo\'limidan ko\'rishingiz mumkin.' },
  { question: 'Loyiha qilinadimi?', answer: 'Ha, kurs davomida 2-3 ta real loyiha qilinadi.' },
  { question: 'Sertifikat beriladimi?', answer: 'Kursni yakunlagan ishtirokchilarga sertifikat taqdim etiladi.' },
  { question: 'Kursdan keyin nima qilish mumkin?', answer: 'Frontend yoki Full Stack yo\'nalishida loyihalar ustida ishlashni davom ettirish, portfolio yaratish mumkin.' },
  { question: 'Ishga joylashishga yordam beriladimi?', answer: 'Portfolio va loyihalar orqali tayyorgarlik ko\'rishga yordam beramiz, biroq ish joyi kafolatlanmaydi.' },
];

export const teacherText = `👨‍🏫 <b>O'QITUVCHI</b>

<b>Eshmatov Sardor</b>
Full Stack Developer

📱 Telegram: @inet_coder
🌐 Web: Inetcoder.uz

Zamonaviy web-texnologiyalar asosida frontend va backend loyihalarni ishlab chiqish tajribasiga ega. Kursda nazariyani amaliyot bilan uyg'unlashtirib, real loyihalar orqali o'rgatadi.`;
