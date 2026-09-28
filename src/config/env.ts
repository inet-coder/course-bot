import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, 'BOT_TOKEN majburiy'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL majburiy'),
  ADMIN_IDS: z.string().default(''),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  COURSE_PRICE: z.string().default(''),
  COURSE_DURATION: z.string().default(''),
  COURSE_START_DATE: z.string().default(''),
  COURSE_LOCATION: z.string().default(''),
  COURSE_PHONE: z.string().default(''),
  COURSE_TELEGRAM: z.string().default(''),
  COURSE_WEBSITE: z.string().default(''),
  COURSE_ADDRESS: z.string().default(''),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Environment o\'zgaruvchilar xato:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const adminIds: number[] = env.ADMIN_IDS.split(',')
  .map((id) => id.trim())
  .filter(Boolean)
  .map(Number)
  .filter((id) => !Number.isNaN(id));

export const isProduction = env.NODE_ENV === 'production';
