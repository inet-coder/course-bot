import { TrafficSource } from '@prisma/client';
import { prisma } from '../prisma';

export interface UpsertUserInput {
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  source?: TrafficSource;
}

export const userRepository = {
  async upsertFromTelegram(input: UpsertUserInput) {
    return prisma.user.upsert({
      where: { telegramId: BigInt(input.telegramId) },
      update: {
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
      },
      create: {
        telegramId: BigInt(input.telegramId),
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        source: input.source ?? 'OTHER',
      },
    });
  },

  async findByTelegramId(telegramId: number) {
    return prisma.user.findUnique({ where: { telegramId: BigInt(telegramId) } });
  },

  async setBlocked(telegramId: number, blocked: boolean) {
    return prisma.user.update({ where: { telegramId: BigInt(telegramId) }, data: { blocked } });
  },

  async countAll() {
    return prisma.user.count();
  },

  async countToday() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.user.count({ where: { createdAt: { gte: start } } });
  },

  async countBySource() {
    return prisma.user.groupBy({ by: ['source'], _count: { source: true } });
  },

  async listActiveTelegramIds(): Promise<bigint[]> {
    const users = await prisma.user.findMany({
      where: { blocked: false },
      select: { telegramId: true },
    });
    return users.map((u: { telegramId: bigint }) => u.telegramId);
  },
};
