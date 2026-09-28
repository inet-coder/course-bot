export interface StageSeed {
  title: string;
  intro: string;
  topics: string[];
}

export interface TechSeed {
  key: string;
  emoji: string;
  name: string;
  description: string;
  usage: string[];
}

export interface CourseSeed {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  welcomeItems: string[]; // "💻 JavaScript" ko'rinishidagi tayyor qatorlar
  aboutBullets: string[]; // "✅ JavaScript" ko'rinishidagi tayyor qatorlar
  outcomeBullets: string[]; // "• React bilan frontend yaratish" ko'rinishidagi tayyor qatorlar
  stages: StageSeed[];
  technologies: TechSeed[];
  order: number;
}

const jsTech: TechSeed = {
  key: 'javascript',
  emoji: '💛',
  name: 'JavaScript',
  description:
    'JavaScript — veb-sahifalarga harakat va interaktivlik qo\'shadigan dasturlash tili. U ham frontendda (brauzerda), ham backendda (Node.js orqali) ishlaydi.',
  usage: ['🌐 Web saytlar', '🛒 Internet do\'konlar', '📊 Dashboardlar', '📱 Web ilovalar', '🤖 Botlar'],
};

const htmlTech: TechSeed = {
  key: 'html',
  emoji: '🧱',
  name: 'HTML',
  description: 'HTML — web sahifaning strukturasi va skeletini yaratadi. Har bir sayt HTML asosida quriladi.',
  usage: ['Saytlar', 'Landing page', 'Internet do\'kon', 'Blog', 'Web application'],
};

const cssTech: TechSeed = {
  key: 'css',
  emoji: '🎨',
  name: 'CSS',
  description: 'CSS sayt yoki ilovaning tashqi ko\'rinishini, dizaynini va animatsiyalarini boshqaradi.',
  usage: ['Dizayn', 'Responsive layout', 'Animatsiya', 'UI/UX'],
};

const reactTech: TechSeed = {
  key: 'react',
  emoji: '⚛️',
  name: 'React.js',
  description:
    'React.js — zamonaviy frontend kutubxonasi. Component, props, state va hooks orqali qayta ishlatiladigan interfeyslar yaratiladi.',
  usage: ['Dashboard', 'SaaS platformalar', 'Internet do\'kon', 'Admin panel', 'Web application'],
};

const nodeTech: TechSeed = {
  key: 'node',
  emoji: '🟢',
  name: 'Node.js',
  description: 'Node.js orqali JavaScript serverda ishlatiladi — bu backend yaratish imkonini beradi.',
  usage: ['Backend', 'REST API', 'Real-time application', 'Telegram botlar'],
};

const expressTech: TechSeed = {
  key: 'express',
  emoji: '⚙️',
  name: 'Express.js',
  description: 'Express — Node.js uchun eng ko\'p ishlatiladigan web framework. API va serverlarni tez qurish imkonini beradi.',
  usage: ['REST API', 'Authentication', 'Backend', 'CRUD'],
};

const databaseTech: TechSeed = {
  key: 'database',
  emoji: '🗄',
  name: 'Database',
  description:
    'Database — ma\'lumotlarni saqlash tizimi (masalan, PostgreSQL, MySQL, MongoDB). Foydalanuvchi, mahsulot, buyurtma kabi ma\'lumotlar shu yerda saqlanadi.',
  usage: ['User ma\'lumotlari', 'Mahsulotlar', 'Buyurtmalar', 'Kurs ma\'lumotlari'],
};

const pythonTech: TechSeed = {
  key: 'python',
  emoji: '🐍',
  name: 'Python',
  description:
    'Python — sodda sintaksisi tufayli dasturlashni o\'rganish uchun eng qulay tillardan biri. Web, avtomatlashtirish, ma\'lumotlar tahlili va sun\'iy intellektda keng qo\'llaniladi.',
  usage: ['Backend (Django/Flask)', 'Avtomatlashtirish', 'Ma\'lumotlar tahlili', 'Sun\'iy intellekt', 'Skriptlar'],
};

export const courseSeeds: CourseSeed[] = [
  {
    key: 'fullstack',
    title: '0 dan Full Stackgacha',
    shortTitle: 'DASTURLASH KURSI — 0 DAN FULL STACKGACHA',
    description:
      'Kurs dasturlashni boshlang\'ich darajadan o\'rganib, Full Stack Web Development yo\'nalishiga kirishni istaganlar uchun mo\'ljallangan.',
    welcomeItems: [
      '💻 JavaScript',
      '🎨 Frontend',
      '⚛️ React.js',
      '⚙️ Node.js',
      '🚀 Backend',
      '🔌 API',
      '🗄 Ma\'lumotlar bazasi',
    ],
    aboutBullets: [
      '✅ Dasturlash asoslari',
      '✅ Algoritm va mantiq',
      '✅ JavaScript',
      '✅ HTML',
      '✅ CSS',
      '✅ React.js',
      '✅ Node.js',
      '✅ Express.js',
      '✅ API',
      '✅ Database',
      '✅ Git/GitHub',
      '✅ Real loyihalar',
    ],
    outcomeBullets: [
      '• HTML bilan web sahifa yaratish',
      '• CSS bilan dizayn qilish',
      '• JavaScript bilan interaktivlik yaratish',
      '• React bilan frontend yaratish',
      '• Node.js bilan backend yaratish',
      '• Express bilan API yaratish',
      '• Database bilan ishlash',
      '• Authentication qilish',
      '• API ulash',
      '• Git/GitHub ishlatish',
      '• Full Stack loyiha yaratish',
    ],
    order: 0,
    stages: [
      {
        title: '01 — DASTURLASHGA KIRISH',
        intro: 'Dasturlashning eng boshlang\'ich, lekin eng muhim asoslari shu bosqichda o\'rganiladi.',
        topics: [
          'Dasturlar qanday ishlaydi',
          'Dasturlash nima?',
          'Algoritm nima?',
          'O\'zgaruvchilar',
          'Shartlar',
          'Sikllar',
          'Funksiyalar',
          'Mantiqiy fikrlash',
        ],
      },
      {
        title: '02 — JAVASCRIPT',
        intro: 'JavaScript — Web dasturlashdagi eng muhim tillardan biri.',
        topics: [
          'Variables', 'Data Types', 'Operators', 'Conditions', 'Loops',
          'Functions', 'Arrays', 'Objects', 'DOM', 'Events', 'Async/Await', 'Fetch API',
        ],
      },
      {
        title: '03 — FRONTEND',
        intro: 'Frontend — foydalanuvchi ko\'radigan va foydalanadigan qism. Texnologiyalar: HTML, CSS, JavaScript, React.js.',
        topics: [
          'Sahifa yaratish', 'Responsive design', 'Componentlar', 'State',
          'Props', 'API bilan ishlash', 'Formalar', 'Routing',
        ],
      },
      {
        title: '04 — BACKEND',
        intro: 'Backend — ilovaning server tomoni. Texnologiyalar: Node.js, Express.js, API, Database.',
        topics: [
          'Server yaratish', 'REST API', 'CRUD', 'Authentication',
          'Database bilan ishlash', 'API security', 'Validation',
        ],
      },
    ],
    technologies: [jsTech, htmlTech, cssTech, reactTech, nodeTech, expressTech, databaseTech],
  },
  {
    key: 'unfa',
    title: 'Unfa — Dasturlash asoslari',
    shortTitle: 'DASTURLASH ASOSLARI KURSI — UNFA',
    description:
      'Kurs dasturlashni umuman bilmagan boshlovchilar uchun mo\'ljallangan — dasturlash mantig\'idan boshlab, veb va Python asoslarigacha bosqichma-bosqich o\'rgatadi.',
    welcomeItems: [
      '🧠 Dasturlash mantig\'i',
      '🧱 HTML',
      '🎨 CSS',
      '💛 JavaScript',
      '🐍 Python',
    ],
    aboutBullets: [
      '✅ Dasturlash asoslari',
      '✅ Algoritm va mantiq',
      '✅ HTML',
      '✅ CSS',
      '✅ JavaScript',
      '✅ Python',
      '✅ Kichik amaliy loyihalar',
    ],
    outcomeBullets: [
      '• HTML bilan web sahifa yaratish',
      '• CSS bilan dizayn qilish',
      '• JavaScript bilan interaktivlik yaratish',
      '• Python bilan skript va kichik dasturlar yozish',
      '• Fayllar va ma\'lumotlar bilan ishlash',
      '• Dasturlash mantig\'ini mustaqil qo\'llash',
      '• Full Stack yo\'nalishiga (yoki tanlagan boshqa yo\'nalishga) tayyorgarlik',
    ],
    order: 1,
    stages: [
      {
        title: '01 — DASTURLASHGA KIRISH',
        intro: 'Dasturlashning eng boshlang\'ich, lekin eng muhim asoslari shu bosqichda o\'rganiladi.',
        topics: [
          'Dasturlar qanday ishlaydi',
          'Dasturlash nima?',
          'Algoritm nima?',
          'O\'zgaruvchilar',
          'Shartlar',
          'Sikllar',
          'Funksiyalar',
          'Mantiqiy fikrlash',
        ],
      },
      {
        title: '02 — HTML & CSS ASOSLARI',
        intro: 'Web sahifaning strukturasi (HTML) va tashqi ko\'rinishi (CSS) shu bosqichda o\'rganiladi.',
        topics: [
          'HTML tuzilishi', 'Teglar va atributlar', 'Formalar', 'CSS selektorlar',
          'Box model', 'Flexbox', 'Responsive dizayn',
        ],
      },
      {
        title: '03 — JAVASCRIPT ASOSLARI',
        intro: 'JavaScript yordamida sahifalarga interaktivlik qo\'shishni o\'rganasiz.',
        topics: [
          'Variables', 'Data Types', 'Operators', 'Conditions', 'Loops',
          'Functions', 'Arrays', 'Objects', 'DOM', 'Events',
        ],
      },
      {
        title: '04 — PYTHON ASOSLARI',
        intro: 'Python — sodda va tushunarli sintaksisi bilan dasturlashning navbatdagi bosqichi.',
        topics: [
          'Python sintaksisi', 'O\'zgaruvchilar va tiplar', 'Shartlar va sikllar',
          'Funksiyalar', 'Ro\'yxat va lug\'atlar', 'Fayllar bilan ishlash', 'Kichik loyihalar',
        ],
      },
    ],
    technologies: [jsTech, pythonTech, htmlTech, cssTech],
  },
];
