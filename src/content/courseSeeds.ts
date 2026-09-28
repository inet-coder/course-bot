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
    key: 'backend-developer',
    title: 'Backend Developer',
    shortTitle: 'BACKEND DEVELOPER KURSI',
    description:
      'Zamonaviy backend dasturchi bo\'lish uchun barchasi bu yerda! 0 dan boshlab, Python → JavaScript → Node.js → Express.js → Database → Security → Deploy. 17.5 oy ichida server tomonidagi hamma narsani o\'rganing.',
    welcomeItems: [
      '🐍 Python — asosiy fikrlash',
      '💛 JavaScript — tez o\'rganish',
      '🟢 Node.js — serverga chiqish',
      '⚙️ Express.js — API yaratish',
      '🗄 PostgreSQL — ma\'lumotlar',
      '🛡 Security — xavfsiz kod',
      '🚀 Deploy — serverga joylashtirish',
    ],
    aboutBullets: [
      '✅ 0 dan professional darajagacha',
      '✅ Python + JavaScript + Node.js + Express',
      '✅ REST API va Database',
      '✅ Authentication va Security',
      '✅ Docker va CI/CD',
      '✅ Real loyihalar va portfolio',
      '✅ Haftasiga 15-20 soat ishlash',
      '✅ Junior Backend Developer'ga tayyor',
    ],
    outcomeBullets: [
      '• Algoritmik fikrlash ko\'nikmasi',
      '• Python bilan CLI dastur',
      '• JavaScript bilan async kod',
      '• Node.js bilan server',
      '• Express bilan REST API',
      '• PostgreSQL bilan database',
      '• JWT bilan authentication',
      '• Testing va debugging',
      '• Docker orqali deploy',
      '• GitHub va CI/CD',
      '• Real backend loyihasi',
    ],
    order: 0,
    stages: [
      {
        title: '01 — FOUNDATION PYTHON (4 oy)',
        intro:
          'Dasturlash tilini emas — FIKRLASHNI o\'rgatish! Terminal, Git, debugging, OOP. Python bu yerda vosita, maqsad dasturiy mantiqni o\'zlashtirish.',
        topics: [
          'Terminal va ish muhiti',
          'O\'zgaruvchi, tiplar, shartlar',
          'Sikllar va algoritmlar',
          'Ro\'yxatlar, lug\'atlar, setlar',
          'Funksiyalar va modullar',
          'Xatolar va debugging',
          'Fayllar va JSON',
          'Object-Oriented Programming',
          'Pytest — testlar yozish',
          'Git va GitHub — 1-oy oxiridan',
        ],
      },
      {
        title: '02 — JAVASCRIPT (2 oy)',
        intro:
          'Ikkinchi til, lekin tez! Python bilan solishtirib, closure, asinxronlik, async/await, fetch API. Backend uchun zaruriy narsalar.',
        topics: [
          'Python bilan taqqoslash',
          'Arrow functions va closure',
          'Higher-order: map, filter, reduce',
          'Destructuring va spread operator',
          'Classes va ES modules',
          'Callback, Promise, async/await',
          'Event loop tushunchasi',
          'fetch API — JSON',
          'npm va package.json',
          'ESLint, Prettier',
        ],
      },
      {
        title: '03 — NODE.JS (1.5 oy)',
        intro:
          'JavaScriptni serverga! Frameworksiz noldan HTTP server. Event loop, streaming, file system. Express nima uchun kerakligini tushunersi.',
        topics: [
          'V8 va Event loop',
          'fs, path, events, streams modullar',
          'npm va environment variables',
          'http moduli — server yozish',
          'Routing qo\'lda',
          'Body parsing va headers',
          'Status kodlar',
          'Error handling',
          'Logging asoslari',
          'Process va ruxsatlar',
        ],
      },
      {
        title: '04 — EXPRESS.JS (2.5 oy)',
        intro:
          'Professional REST API! Routing, middleware, validation, error handling, RBAC. Real backend struktura: routes → controllers → services → repositories.',
        topics: [
          'Express asoslari — routing',
          'req/res — Node\'dakini solishtirish',
          'Middleware zanjiri',
          'Schema-based validation',
          'Markaziy error handler',
          'Layered architecture',
          'Password hashing — bcrypt',
          'JWT tokenlar',
          'Role-Based Access Control',
          'API testing — supertest',
          'Swagger dokumentatsiya',
        ],
      },
      {
        title: '05 — DATABASE (2.5 oy)',
        intro:
          'Ma\'lumotlarni to\'g\'ri saqlash! SQL, schema, indexlar, tranzaksiyalar. PostgreSQL + Node.js. Foydalanuvchi, mahsulot, buyurtma.',
        topics: [
          'Relational model va keys',
          'Normalizatsiya',
          'SQL: CRUD, filter, JOIN',
          'Aggregation va subqueries',
          'ERD — Entity Relationship Diagram',
          '1-1, 1-N, N-N bog\'lanishlar',
          'Index va EXPLAIN',
          'Transaction va ACID',
          'Race condition',
          'Connection pool',
          'SQL injection — xavfsizlik',
          'ORM vs Query builder',
          'Migration — schema versioning',
        ],
      },
      {
        title: '06 — ADVANCED (3 oy)',
        intro:
          'Production-ready tizimlari! Security, testing, cache, monitoring, Linux, Docker, CI/CD. Xavfsiz, tez, deployga tayyor.',
        topics: [
          'OWASP Top 10',
          'Rate limiting',
          'CORS va CSRF',
          'Secrets boshqaruvi',
          'Refresh token va session',
          'Unit/Integration/E2E testlar',
          'Mocking va test DB',
          'Code coverage',
          'SOLID prinsiplari',
          'Dependency injection',
          'Redis cache',
          'DB optimizatsiya',
          'Logging va monitoring',
          'Background jobs',
          'File upload',
          'Webhook',
          'TypeScript asoslari',
          'SSH, Linux users',
          'systemd, Nginx',
          'Docker va Docker Compose',
          'GitHub Actions',
        ],
      },
      {
        title: '07 — LOYIHA (2 oy)',
        intro:
          'Mustaqil backend loyihasi! Real ish jarayoni: talab → dizayn → sprint → code review → deploy. Portfolio uchun.',
        topics: [
          'MVP va user story',
          'API contract — OpenAPI',
          'ERD — schema dizayni',
          'Sprint planning',
          'Git branching va PR',
          'Code review qo\'llanish',
          'Auth + core business logic',
          'Validation va error handling',
          'Unit va integration testlar',
          'Security checklist',
          'Redis cache',
          'Background job',
          'Rate limiting',
          'Docker Compose',
          'CI/CD pipeline',
          'VPS\'ga deploy',
          'Custom domain + HTTPS',
          'Monitoring va logs',
          'Dokumentatsiya',
        ],
      },
    ],
    technologies: [pythonTech, jsTech, nodeTech, expressTech, databaseTech],
  },
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
    order: 2,
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
