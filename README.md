# 🚀 Course Bot — "0 dan Full Stackgacha"

"0 dan Full Stackgacha" dasturlash kursi uchun professional, production-ready Telegram bot. Foydalanuvchilarga kurs haqida to'liq ma'lumot beradi, texnologiyalarni tushuntiradi va kursga yozilish arizalarini qabul qiladi. Admin panel orqali arizalar, statistika va broadcast boshqariladi.

## 1. Xususiyatlar

- 🇺🇿 To'liq o'zbek tilida, tushunarli va professional uslub
- 📚 Kurs haqida, kurs dasturi (4 bosqich), texnologiyalar, qayerda ishlatilishi
- 🚀 Real loyihalar, kurs afzalliklari, o'qituvchi haqida
- 📝 Kursga yozilish — bosqichma-bosqich FSM (ism → telefon → yosh → tajriba → maqsad → manba → tasdiqlash)
- ❓ Dinamik FAQ (database orqali boshqariladi)
- 🔐 Admin panel: statistika, arizalarni qabul/rad etish, foydalanuvchilar, broadcast, sozlamalar
- 📢 Broadcast — rate-limit va bloklangan foydalanuvchilarni avtomatik aniqlash bilan
- 📅 Marketing deep-link (`/start instagram`, `/start telegram`, `/start friend` va h.k.) orqali traffic source tracking
- 🛡 Zod validation, admin auth middleware, rate limiting, global error handler, structured logging

## 2. Texnologiyalar

- **Backend:** Node.js, TypeScript, grammY
- **Database:** PostgreSQL + Prisma ORM
- **Validation:** Zod
- **Logging:** pino
- **Deployment:** Docker, docker-compose

## 3. Loyiha strukturasi

```
src/
  bot/
    bot.ts                 — barcha handlerlarni birlashtiruvchi bot core
    handlers/
      commands/             — /start
      callbacks/             — kurs, texnologiya, usage, faq, info, navigation
      apply/                 — kursga yozilish FSM
      admin/                 — admin panel, arizalar, broadcast, sozlamalar
    keyboards/               — barcha inline/reply keyboardlar
    middlewares/             — session, user tracking, admin auth, rate limit
  config/                   — env validatsiya (Zod)
  content/                  — kurs matnlari (kod ichiga hardcode qilinmagan)
  database/
    prisma.ts               — Prisma client singleton
    repositories/            — database access qatlami
  services/                 — business logic (ariza, statistika, broadcast)
  types/                    — context va session tiplari
  utils/                    — logger, validation
  index.ts                  — entrypoint
prisma/
  schema.prisma
  seed.ts                    — boshlang'ich FAQ/texnologiya/loyiha/admin ma'lumotlarini yuklash
```

Kontent (kurs matnlari, texnologiyalar, FAQ) `src/content/` papkasida alohida saqlanadi — botning ishlash logikasiga tegmasdan matnlarni yangilash mumkin. FAQ, Technology, Project modellari database'da ham saqlanadi (`prisma/seed.ts` orqali boshlang'ich to'ldiriladi), shu orqali admin kelajakda ularni kod o'zgartirmasdan boshqara oladi.

## 4. O'rnatish (development)

### 4.1. Talablar
- Node.js 20+
- PostgreSQL 16+ (yoki Docker)
- Telegram bot tokeni ([@BotFather](https://t.me/BotFather) orqali)

### 4.2. Bosqichlar

```bash
# 1. Dependencies o'rnatish
npm install

# 2. .env faylini sozlash
cp .env.example .env
# .env faylini oching va BOT_TOKEN, DATABASE_URL, ADMIN_IDS ni to'ldiring

# 3. Prisma client generatsiya qilish
npm run prisma:generate

# 4. Database migratsiyasini ishga tushirish
npm run prisma:migrate

# 5. Boshlang'ich ma'lumotlarni yuklash (FAQ, texnologiyalar, loyihalar, adminlar)
npm run prisma:seed

# 6. Botni development rejimida ishga tushirish
npm run dev
```

## 5. Environment o'zgaruvchilar (.env)

| O'zgaruvchi | Tavsif |
|---|---|
| `BOT_TOKEN` | @BotFather bergan bot tokeni |
| `DATABASE_URL` | PostgreSQL ulanish satri |
| `ADMIN_IDS` | Admin Telegram ID lari, vergul bilan ajratilgan (masalan: `123456,789012`) |
| `COURSE_PRICE` / `COURSE_DURATION` / `COURSE_START_DATE` / `COURSE_LOCATION` | Kursning boshlang'ich sozlamalari (keyin admin panel orqali o'zgartiriladi) |
| `COURSE_PHONE` / `COURSE_TELEGRAM` / `COURSE_WEBSITE` / `COURSE_ADDRESS` | Bog'lanish ma'lumotlari |
| `NODE_ENV` | `development` yoki `production` |
| `LOG_LEVEL` | `info`, `warn`, `error`, `debug` |

## 6. Telegram BotFather sozlamalari

1. Telegramda [@BotFather](https://t.me/BotFather) ga yozing
2. `/newbot` buyrug'ini yuboring, bot nomi va username kiriting
3. Olingan tokenni `.env` dagi `BOT_TOKEN` ga qo'ying
4. (Ixtiyoriy) `/setcommands` orqali quyidagini o'rnating:
   ```
   start - Botni ishga tushirish
   admin - Admin panel (faqat adminlar uchun)
   ```

## 7. Admin ID ni aniqlash

O'z Telegram ID ingizni bilish uchun [@userinfobot](https://t.me/userinfobot) ga yozing yoki botga `/start` yozgach console loglarida `telegramId` ni ko'ring. Olingan ID ni `.env` dagi `ADMIN_IDS` ga qo'shing va `npm run prisma:seed` ni qayta ishga tushiring (yoki botni qayta ishga tushirsangiz avtomatik seed bo'ladi).

## 8. Production (Docker)

```bash
# .env faylini to'ldirgan bo'ling
docker compose up -d --build

# Birinchi marta migratsiya va seedni qo'lda ishga tushirish
docker compose exec bot npx prisma migrate deploy
docker compose exec bot npx tsx prisma/seed.ts
```

## 9. Kengaytirish

- **Yangi FAQ/texnologiya/loyiha qo'shish:** `prisma/seed.ts` dagi manba fayllarni (`src/content/*.ts`) yangilang va qayta seed qiling, yoki to'g'ridan-to'g'ri database orqali (Prisma Studio: `npm run prisma:studio`) qo'shing.
- **Yangi kurs bosqichi:** `src/content/course.ts` dagi `courseStages` massiviga yangi element qo'shish yetarli — keyboard va handlerlar avtomatik moslashadi.
- **Yangi admin:** `.env` dagi `ADMIN_IDS` ga ID qo'shing va botni qayta ishga tushiring.
- **Yangi til:** `src/content/` papkasidagi matnларни boshqa tilga tarjima qilib, alohida content modul sifatida ulash mumkin.

## 10. Xavfsizlik

- Bot tokeni va database credentials faqat `.env` da saqlanadi, kodga yozilmagan
- Admin panel `ADMIN_IDS` / database `Admin` jadvali orqali tekshiriladi (faqat frontend/tugma emas — har bir admin callback/komanda `requireAdmin` middleware orqali o'tadi)
- Barcha foydalanuvchi kiritgan ma'lumotlar Zod orqali validatsiya qilinadi
- Rate limiting orqali flood/spam himoyasi
- Loglarda tokenlar va parollar avtomatik `redact` qilinadi

## 11. Troubleshooting

| Muammo | Yechim |
|---|---|
| `BOT_TOKEN majburiy` xatoligi | `.env` faylida `BOT_TOKEN` to'g'ri kiritilganini tekshiring |
| Database ulanmayapti | `DATABASE_URL` formatini va PostgreSQL ishlab turganini tekshiring |
| Admin panelga kira olmayapman | Telegram ID ingiz `.env` dagi `ADMIN_IDS` da borligini va seed ishga tushganini tekshiring |
| Broadcast juda sekin ketyapti | Bu ataylab shunday — Telegram flood limitidan saqlanish uchun har xabar orasida kichik pauza bor |
