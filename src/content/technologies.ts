export interface TechInfo {
  key: string;
  emoji: string;
  name: string;
  description: string;
  usage: string[];
}

export const technologies: TechInfo[] = [
  {
    key: 'javascript',
    emoji: '💛',
    name: 'JavaScript',
    description:
      'JavaScript — veb-sahifalarga harakat va interaktivlik qo\'shadigan dasturlash tili. U ham frontendda (brauzerda), ham backendda (Node.js orqali) ishlaydi.',
    usage: ['🌐 Web saytlar', '🛒 Internet do\'konlar', '📊 Dashboardlar', '📱 Web ilovalar', '⚙️ Serverlar', '🔌 API', '🤖 Botlar'],
  },
  {
    key: 'html',
    emoji: '🧱',
    name: 'HTML',
    description: 'HTML — web sahifaning strukturasi va skeletini yaratadi. Har bir sayt HTML asosida quriladi.',
    usage: ['Saytlar', 'Landing page', 'Internet do\'kon', 'Blog', 'Web application'],
  },
  {
    key: 'css',
    emoji: '🎨',
    name: 'CSS',
    description: 'CSS sayt yoki ilovaning tashqi ko\'rinishini, dizaynini va animatsiyalarini boshqaradi.',
    usage: ['Dizayn', 'Responsive layout', 'Animatsiya', 'UI/UX'],
  },
  {
    key: 'react',
    emoji: '⚛️',
    name: 'React.js',
    description:
      'React.js — zamonaviy frontend kutubxonasi. Component, props, state va hooks orqali qayta ishlatiladigan interfeyslar yaratiladi.',
    usage: ['Dashboard', 'SaaS platformalar', 'Internet do\'kon', 'Admin panel', 'Social platform', 'Web application'],
  },
  {
    key: 'node',
    emoji: '🟢',
    name: 'Node.js',
    description: 'Node.js orqali JavaScript serverda ishlatiladi — bu backend yaratish imkonini beradi.',
    usage: ['Backend', 'REST API', 'Real-time application', 'Authentication', 'Microservices', 'Telegram botlar'],
  },
  {
    key: 'express',
    emoji: '⚙️',
    name: 'Express.js',
    description: 'Express — Node.js uchun eng ko\'p ishlatiladigan web framework. API va serverlarni tez qurish imkonini beradi.',
    usage: ['REST API', 'Authentication', 'Backend', 'Middleware', 'CRUD', 'Server application'],
  },
  {
    key: 'database',
    emoji: '🗄',
    name: 'Database',
    description:
      'Database — ma\'lumotlarni saqlash tizimi (masalan, PostgreSQL, MySQL, MongoDB). Foydalanuvchi, mahsulot, buyurtma, post kabi ma\'lumotlar shu yerda saqlanadi.',
    usage: ['User ma\'lumotlari', 'Mahsulotlar', 'Buyurtmalar', 'Postlar', 'Xabarlar', 'Kurs ma\'lumotlari'],
  },
];

export const marketNoteText = `🏆 <b>TEXNOLOGIYALAR BUGUNGI BOZORDA</b>

💛 <b>JavaScript</b> — web development uchun juda muhim til
⚛️ <b>React</b> — zamonaviy frontend ekotizimida keng qo'llaniladi
🟢 <b>Node.js</b> — JavaScript yordamida backend yaratish imkonini beradi
🧱 <b>HTML/CSS</b> — web developmentning fundamental texnologiyalari
🗄 <b>SQL/Database</b> — deyarli barcha katta tizimlarda ma'lumotlarni boshqarish uchun kerak

<i>Eslatma: aniq statistika, reyting yoki maosh ko'rsatkichlarini istasangiz, Stack Overflow Developer Survey, GitHub Octoverse yoki State of JS kabi rasmiy manbalarga murojaat qiling — ko'rsatkichlar vaqt o'tishi bilan o'zgarib turadi.</i>`;
