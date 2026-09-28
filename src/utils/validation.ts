import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak')
  .max(50, 'Ism juda uzun');

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?\d{9,15}$/, 'Telefon raqam noto\'g\'ri formatda');

export const ageSchema = z
  .number()
  .int()
  .min(10, 'Yosh noto\'g\'ri')
  .max(100, 'Yosh noto\'g\'ri');

export const applicationInputSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  age: ageSchema.optional(),
  experience: z.string().trim().max(300).optional(),
  goal: z.string().trim().max(300).optional(),
  source: z.string().trim().max(100).optional(),
});

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

export function safeParseAge(raw: string): number | null {
  const n = Number(raw.replace(/\D/g, ''));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}
