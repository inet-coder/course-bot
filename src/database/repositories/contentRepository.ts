import { prisma } from '../prisma';

export const faqRepository = {
  async list() {
    return prisma.faq.findMany({ orderBy: { order: 'asc' } });
  },
  async seedIfEmpty(items: { question: string; answer: string }[]) {
    const count = await prisma.faq.count();
    if (count > 0) return;
    await prisma.faq.createMany({
      data: items.map((item, index) => ({ ...item, order: index })),
    });
  },
};

export const technologyRepository = {
  async listByCourse(courseId: number) {
    return prisma.technology.findMany({ where: { courseId }, orderBy: { order: 'asc' } });
  },
  async findById(id: number) {
    return prisma.technology.findUnique({ where: { id } });
  },
  async seedIfEmpty(
    courseId: number,
    items: { key: string; emoji: string; name: string; description: string; usage: string }[],
  ) {
    const count = await prisma.technology.count({ where: { courseId } });
    if (count > 0) return;
    await prisma.technology.createMany({
      data: items.map((item, index) => ({ ...item, courseId, order: index })),
    });
  },
};

export const stageRepository = {
  async listByCourse(courseId: number) {
    return prisma.courseStage.findMany({ where: { courseId }, orderBy: { order: 'asc' } });
  },
  async findById(id: number) {
    return prisma.courseStage.findUnique({ where: { id } });
  },
  async seedIfEmpty(
    courseId: number,
    items: { title: string; intro: string; topics: string[] }[],
  ) {
    const count = await prisma.courseStage.count({ where: { courseId } });
    if (count > 0) return;
    await prisma.courseStage.createMany({
      data: items.map((item, index) => ({
        courseId,
        title: item.title,
        intro: item.intro,
        topics: item.topics.join('\n'),
        order: index,
      })),
    });
  },
};

export const projectRepository = {
  async list() {
    return prisma.project.findMany({ orderBy: { order: 'asc' } });
  },
  async seedIfEmpty(items: { title: string; description: string; technologies: string }[]) {
    const count = await prisma.project.count();
    if (count > 0) return;
    await prisma.project.createMany({
      data: items.map((item, index) => ({ ...item, order: index })),
    });
  },
};

export const adminRepository = {
  async isAdmin(telegramId: number): Promise<boolean> {
    const admin = await prisma.admin.findUnique({ where: { telegramId: BigInt(telegramId) } });
    return Boolean(admin);
  },
  async listAll() {
    return prisma.admin.findMany();
  },
  async ensureSeeded(ids: number[]) {
    for (const id of ids) {
      await prisma.admin.upsert({
        where: { telegramId: BigInt(id) },
        update: {},
        create: { telegramId: BigInt(id), role: 'SUPER_ADMIN' },
      });
    }
  },
};
