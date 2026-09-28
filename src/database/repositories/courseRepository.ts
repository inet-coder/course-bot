import { prisma } from '../prisma';

export interface CourseInput {
  key: string;
  title: string;
  description?: string;
  price?: string;
  duration?: string;
  startDate?: string;
  location?: string;
  format?: string;
  phone?: string;
  telegram?: string;
  website?: string;
  address?: string;
  order?: number;
}

export const courseRepository = {
  async listAll() {
    return prisma.course.findMany({ orderBy: { order: 'asc' } });
  },

  async getActive() {
    const active = await prisma.course.findFirst({ where: { isActive: true } });
    if (active) return active;
    // Faol kurs belgilanmagan bo'lsa — birinchi kursni faol qilamiz (fallback)
    const first = await prisma.course.findFirst({ orderBy: { order: 'asc' } });
    if (!first) return null;
    return prisma.course.update({ where: { id: first.id }, data: { isActive: true } });
  },

  async getById(id: number) {
    return prisma.course.findUnique({ where: { id } });
  },

  async setActive(id: number) {
    await prisma.$transaction([
      prisma.course.updateMany({ data: { isActive: false }, where: {} }),
      prisma.course.update({ where: { id }, data: { isActive: true } }),
    ]);
    return prisma.course.findUnique({ where: { id } });
  },

  async update(id: number, data: Partial<CourseInput>) {
    return prisma.course.update({ where: { id }, data });
  },

  async createIfMissing(input: CourseInput & { isActive?: boolean }) {
    const existing = await prisma.course.findUnique({ where: { key: input.key } });
    if (existing) return existing;
    return prisma.course.create({ data: input });
  },
};
