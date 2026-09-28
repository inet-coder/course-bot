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
  welcomeItems: string[];
  aboutBullets: string[];
  outcomeBullets: string[];
  stages: StageSeed[];
  technologies: TechSeed[];
  order: number;
}

const pythonTech: TechSeed = {
  key: 'python',
  emoji: '🐍',
  name: 'Python',
  description:
    'Python zamonaviy backend development uchun eng muhim vosita. Oddiy sintaksisi, kuchli kutubxonalari va keng qollanilishi backend mutaxassislari uchun birinchi tanlov.',
  usage: ['Backend asoslari', 'API development', 'Malumot tahlili', 'Avtomatlashtirish', 'Skriptlar'],
};

const jsTech: TechSeed = {
  key: 'javascript',
  emoji: '💛',
  name: 'JavaScript',
  description:
    'JavaScript server tomonida ishlatilganda backend developerga ajoyib imkoniyatlar beradi. Asinxron dasturlash, event-driven arxitektura va high-performance server yaratish mumkin boladi.',
  usage: ['Server tomonida', 'API development', 'Real-time xizmatlari', 'Microservices', 'CLI toollar'],
};

const nodeTech: TechSeed = {
  key: 'node',
  emoji: '🟢',
  name: 'Node.js',
  description:
    'JavaScript runtime environment bolip, server tomonida JavaScript kodni ishlatish imkonini beradi. Asinxron I/O modeli bilan yuqori performance va masshtablanuvchi backend tizimlarini yasash mumkin.',
  usage: ['Server framework', 'API server', 'Real-time apps', 'Microservices', 'CLI toollar'],
};

const expressTech: TechSeed = {
  key: 'express',
  emoji: '⚙️',
  name: 'Express.js',
  description:
    'Node.js uchun minimal va moslashuvchan web framework. REST API, middleware support va routing mexanizmi bilan production-grade backend tizimlarini yasash uchun ishlatiladi.',
  usage: ['REST API', 'Web server', 'Middleware', 'Authentication', 'Request routing'],
};

const databaseTech: TechSeed = {
  key: 'database',
  emoji: '🗄',
  name: 'PostgreSQL',
  description:
    'Relational database management system. Malumotlar integralligi, ACID compliance, advanced query capabilities va scaling imkoniyatlari bilan production sistemalari uchun ideal tanlov.',
  usage: ['Malumot saqlash', 'Queries', 'Transactions', 'Indexing', 'Replication'],
};

export const courseSeeds: CourseSeed[] = [
  {
    key: 'backend-developer',
    title: 'Backend Developer Sertifikatsiyali Dasturlar',
    shortTitle: 'BACKEND DEVELOPER PROFESSIONAL KURSI',
    description:
      'Professional backend developer bolish uchun zarur bolghan barcha bilim va koniklarimagalarni oz ichiga olghan 18 oylik intensive dastur. 0 dan boshlab, server-side development, API design, database management, security va deployment gacha tolk professional yonalishni organalarsiz. Real loyihalar va industrial standartilar asosida.',
    welcomeItems: [
      'Python fundamental va advanced concepts',
      'JavaScript va asinxron dasturlash',
      'Node.js runtime va server architecture',
      'Express.js bilan REST API design',
      'PostgreSQL relational database',
      'Security, testing va optimization',
      'Production deployment va DevOps',
    ],
    aboutBullets: [
      'Boshlovchi dasturchilar uchun moljallangan professional dastur',
      'Real-world production sistemalari asosida tuzilgan curriculum',
      'Backend development uchun zarur bolghan barcha texnologiyalar',
      'Software architecture va system design principles',
      'Enterprise-level security va best practices',
      'Git, CI/CD, Docker va cloud deployment',
      'Team collaboration va code review jarayonlari',
      'Junior backend engineer position uchun tayyorgarlik',
    ],
    outcomeBullets: [
      'Algoritmik va tuzilgan dasturlash konikmasi',
      'Python bilan backend services yaratish',
      'JavaScript va asinxron programming model',
      'Node.js runtime va event-driven architecture',
      'Express.js bilan scalable REST API',
      'PostgreSQL va relational data modeling',
      'JWT-based authentication va authorization',
      'Unit testing, integration testing va test-driven development',
      'Performance optimization va caching strategies',
      'Docker containerization va orchestration',
      'GitHub workflows va automated testing',
      'Production-ready backend system yaratish',
    ],
    order: 0,
    stages: [
      {
        title: 'Bosqich 1: Python Fundamentals (3 oy)',
        intro:
          'Backend developmentning temelini tashkil etuvchi programming fundamentals. Algoritmik fiklash, data structures, OOP va software engineering best practices organalardi. Python bu bosqichda vosita, maqsad esa coding thinking va professional development mindset shakllantirish.',
        topics: [
          'Development environment va version control (Git/GitHub)',
          'Programming fundamentals: variables, data types, operators',
          'Control flow: conditionals, loops, flow control',
          'Functions va scope: parameter passing, return values, closures',
          'Data structures: lists, tuples, dictionaries, sets va operations',
          'Object-oriented programming: classes, inheritance, polymorphism',
          'Exception handling: error types, try-except-finally blocks',
          'File I/O: reading, writing, working with JSON, CSV formats',
          'Functional programming: lambda, map, filter, reduce',
          'Unit testing: pytest framework, test-driven development',
        ],
      },
      {
        title: 'Bosqich 2: JavaScript va Asinxron Dasturlash (2 oy)',
        intro:
          'Backend development uchun JavaScript va asinxron programming model organalardi. Event loop, callback, Promise va async/await patterns asosida server-side JavaScript development uchun tayyorgarlik. Python bilan solishtirish orqali tez orgamash.',
        topics: [
          'JavaScript syntax va Python bilan taqqoslash',
          'ES6+ features: arrow functions, destructuring, spread operator',
          'Object-oriented JavaScript: prototypes, classes, this binding',
          'Functional concepts: higher-order functions, closures, composition',
          'Asynchronous patterns: callbacks, Promises, async/await',
          'Event loop: microtasks, macrotasks, timing concepts',
          'Error handling: try-catch, Promise rejection, error propagation',
          'NPM ecosystem: package management, dependency resolution',
          'Module system: CommonJS, ES modules, circular dependencies',
          'HTTP fundamentals: methods, headers, status codes, CORS',
        ],
      },
      {
        title: 'Bosqich 3: Node.js va Server Architecture (2 oy)',
        intro:
          'Node.js runtime environment va server-side JavaScript asoslari. Built-in modules, file system operations, stream processing va network programming. Frameworksiz noldan HTTP server yaratish orqali server architecture tushuniladi.',
        topics: [
          'Node.js runtime: V8 engine, event loop, libuv',
          'Core modules: fs, path, util, events, stream, buffer',
          'File system: synchronous va asynchronous operations',
          'Working with streams: readable, writable, transform streams',
          'HTTP module: creating servers, handling requests/responses',
          'URL routing: query parameters, path segments, request parsing',
          'Body parsing: form data, JSON payloads, multipart uploads',
          'Middleware concept: request processing pipeline',
          'Error handling: error propagation, middleware-based handling',
          'Process management: environment variables, signal handling',
        ],
      },
      {
        title: 'Bosqich 4: Express.js va REST API Design (2.5 oy)',
        intro:
          'Express.js framework asosida professional REST API yaratish. Request handling, middleware architecture, validation, error management va layered application structure. Production-ready API design patterns va conventions.',
        topics: [
          'Express fundamentals: routing, middleware, request lifecycle',
          'HTTP methods: GET, POST, PUT, PATCH, DELETE semantics',
          'URL routing: parameters, query strings, nested resources',
          'Request/response handling: headers, body parsing, compression',
          'Middleware: built-in, custom, error handling middleware',
          'Request validation: schema validation, input sanitization',
          'Error handling: error middleware, custom error classes',
          'Application structure: MVC pattern, separation of concerns',
          'Controllers: business logic organization, request delegation',
          'Services: business rules, data processing, external integrations',
          'Repositories: data access layer, query building',
          'Authentication: session management, token-based auth',
          'Authorization: role-based access control, permission checking',
          'API documentation: OpenAPI/Swagger specifications',
        ],
      },
      {
        title: 'Bosqich 5: PostgreSQL va Data Management (3 oy)',
        intro:
          'Relational database modeling, SQL querying va PostgreSQL. Data integrity, normalization, transactions, performance optimization. Backend systems uchun effective data management strategy.',
        topics: [
          'Relational model: tables, rows, columns, relationships',
          'Data types: primitive types, JSON, arrays, custom types',
          'Schema design: primary keys, foreign keys, constraints',
          'Normalization: 1NF, 2NF, 3NF principles va benefits',
          'SQL fundamentals: SELECT, INSERT, UPDATE, DELETE operations',
          'Filtering: WHERE clause, operators, compound conditions',
          'Joining: INNER, LEFT, RIGHT, FULL, CROSS joins',
          'Aggregation: GROUP BY, HAVING, aggregate functions',
          'Subqueries: scalar, inline views, correlated subqueries',
          'Set operations: UNION, INTERSECT, EXCEPT',
          'Transactions: ACID properties, isolation levels, rollback',
          'Indexing: index types, query optimization, execution plans',
          'Query optimization: EXPLAIN ANALYZE, index strategies',
          'Connection pooling: resource management, concurrent connections',
          'Migrations: schema versioning, rollback strategies',
          'ORM/Query builders: abstraction layers, query construction',
        ],
      },
      {
        title: 'Bosqich 6: Security, Testing va Performance (3 oy)',
        intro:
          'Production-grade backend sistemalar uchun security, testing strategy va performance optimization. OWASP principles, comprehensive testing approaches va system scalability.',
        topics: [
          'Security fundamentals: authentication, authorization, encryption',
          'Password management: hashing algorithms, salt, bcrypt',
          'Token-based auth: JWT structure, claims, verification',
          'API security: rate limiting, DDoS protection, input validation',
          'SQL injection: parameterized queries, ORM protection',
          'XSS, CSRF: prevention strategies, secure headers',
          'Data protection: encryption at rest, in transit, key management',
          'Environment security: secrets management, configuration',
          'Testing fundamentals: unit, integration, end-to-end testing',
          'Test frameworks: testing libraries, assertion patterns',
          'Mocking: unit testing isolation, dependency injection',
          'Test data: fixtures, factories, database seeding',
          'Coverage: code coverage analysis, coverage targets',
          'Performance monitoring: metrics, profiling, bottleneck analysis',
          'Caching strategies: in-memory caching, Redis, cache invalidation',
          'Database optimization: query optimization, indexing strategies',
          'API performance: response compression, pagination, lazy loading',
          'Load testing: stress testing, capacity planning',
          'Logging: structured logging, log aggregation, monitoring',
          'TypeScript: static typing, type inference, advanced types',
          'Docker: containerization, image building, container orchestration',
          'CI/CD: continuous integration, automated testing, deployment',
        ],
      },
      {
        title: 'Bosqich 7: Capstone Project va Deployment (2 oy)',
        intro:
          'Barcha organalgan bilimlarni comprehensive backend system yaratishda qollanish. Real-world requirements, professional development practices, team collaboration va production deployment.',
        topics: [
          'Requirements analysis: feature breakdown, user stories',
          'System architecture: microservices vs monolith, scalability',
          'API contract design: endpoint definitions, request/response specs',
          'Database schema: data modeling, relationships, optimization',
          'Development workflow: Git workflow, branching strategy, PR reviews',
          'Feature implementation: authentication, core business logic',
          'Data validation: input validation, business rule enforcement',
          'Error handling: comprehensive error management, recovery',
          'Testing strategy: unit tests, integration tests, coverage targets',
          'Security audit: security checklist, vulnerability assessment',
          'Performance testing: load testing, optimization',
          'Caching layer: Redis implementation, cache strategies',
          'Background jobs: task queues, scheduled tasks, workers',
          'API monitoring: health checks, performance metrics',
          'Deployment pipeline: Docker build, registry, orchestration',
          'Infrastructure: server setup, reverse proxy, SSL/TLS',
          'Monitoring: application monitoring, error tracking, logs',
          'Scaling strategies: horizontal scaling, load balancing',
          'Documentation: API documentation, deployment guide, runbooks',
          'Production readiness: performance, reliability, maintainability',
        ],
      },
    ],
    technologies: [pythonTech, jsTech, nodeTech, expressTech, databaseTech],
  },
];
