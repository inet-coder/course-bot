import { ApplicationStatus, TrafficSource } from '@prisma/client';
import { prisma } from '../prisma';

export interface CreateApplicationInput {
  userId: number;
  name: string;
  phone: string;
  age?: number;
  experience?: string;
  goal?: string;
  source?: TrafficSource;
}

export const applicationRepository = {
  async create(input: CreateApplicationInput) {
    return prisma.courseApplication.create({ data: input });
  },

  async findById(id: number) {
    return prisma.courseApplication.findUnique({ where: { id }, include: { user: true } });
  },

  async setStatus(id: number, status: ApplicationStatus) {
    return prisma.courseApplication.update({ where: { id }, data: { status } });
  },

  async listByStatus(status: ApplicationStatus, take = 10, skip = 0) {
    return prisma.courseApplication.findMany({
      where: { status },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });
  },

  async countByStatus() {
    const [pending, accepted, rejected, total] = await Promise.all([
      prisma.courseApplication.count({ where: { status: 'PENDING' } }),
      prisma.courseApplication.count({ where: { status: 'ACCEPTED' } }),
      prisma.courseApplication.count({ where: { status: 'REJECTED' } }),
      prisma.courseApplication.count(),
    ]);
    return { pending, accepted, rejected, total };
  },
};
