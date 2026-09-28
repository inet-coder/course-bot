import { userRepository } from '../database/repositories/userRepository';
import { applicationRepository } from '../database/repositories/applicationRepository';

export const statsService = {
  async buildOverview() {
    const [totalUsers, todayUsers, appStats, bySource] = await Promise.all([
      userRepository.countAll(),
      userRepository.countToday(),
      applicationRepository.countByStatus(),
      userRepository.countBySource(),
    ]);

    const sourceLines = bySource
      .map((s: { source: string; _count: { source: number } }) => `   • ${s.source}: ${s._count.source}`)
      .join('\n');

    return (
      `📊 <b>STATISTIKA</b>\n\n` +
      `👥 Jami foydalanuvchilar: ${totalUsers}\n` +
      `📅 Bugungi yangi foydalanuvchilar: ${todayUsers}\n\n` +
      `📝 Jami arizalar: ${appStats.total}\n` +
      `🕐 Kutilayotgan: ${appStats.pending}\n` +
      `✅ Qabul qilingan: ${appStats.accepted}\n` +
      `❌ Rad etilgan: ${appStats.rejected}\n\n` +
      `📈 Manba bo'yicha:\n${sourceLines || '   ma\'lumot yo\'q'}`
    );
  },
};
