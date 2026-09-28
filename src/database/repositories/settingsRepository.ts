import { prisma } from '../prisma';
import { env } from '../../config/env';

export const settingsRepository = {
  async get() {
    const existing = await prisma.courseSettings.findFirst();
    if (existing) return existing;

    return prisma.courseSettings.create({
      data: {
        price: env.COURSE_PRICE,
        duration: env.COURSE_DURATION,
        startDate: env.COURSE_START_DATE,
        location: env.COURSE_LOCATION,
        phone: env.COURSE_PHONE,
        telegram: env.COURSE_TELEGRAM,
        website: env.COURSE_WEBSITE,
        address: env.COURSE_ADDRESS,
      },
    });
  },

  async update(data: Partial<{
    price: string;
    duration: string;
    startDate: string;
    location: string;
    format: string;
    phone: string;
    telegram: string;
    website: string;
    address: string;
  }>) {
    const current = await settingsRepository.get();
    return prisma.courseSettings.update({ where: { id: current.id }, data });
  },
};
