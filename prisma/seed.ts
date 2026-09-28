import { faqRepository, projectRepository, adminRepository, stageRepository, technologyRepository } from '../src/database/repositories/contentRepository';
import { courseRepository } from '../src/database/repositories/courseRepository';
import { defaultFaq } from '../src/content/faq';
import { projects } from '../src/content/projects';
import { courseSeeds } from '../src/content/courseSeeds';
import { adminIds } from '../src/config/env';
import { logger } from '../src/utils/logger';

async function main() {
  await faqRepository.seedIfEmpty(defaultFaq);

  await projectRepository.seedIfEmpty(
    projects.map((p) => ({
      title: p.title,
      description: p.features.join(', '),
      technologies: [p.frontend, p.backend, p.database].filter(Boolean).join(', '),
    })),
  );

  // Har bir kursni (formani) yaratish/yangilash va o'ziga tegishli bosqich/texnologiyalarni yuklash
  for (const seed of courseSeeds) {
    const course = await courseRepository.createIfMissing({
      key: seed.key,
      title: seed.title,
      description: seed.description,
      order: seed.order,
    });

    await stageRepository.seedIfEmpty(
      course.id,
      seed.stages.map((s) => ({ title: s.title, intro: s.intro, topics: s.topics })),
    );

    await technologyRepository.seedIfEmpty(
      course.id,
      seed.technologies.map((t) => ({
        key: t.key,
        emoji: t.emoji,
        name: t.name,
        description: t.description,
        usage: t.usage.join(', '),
      })),
    );
  }

  // Birinchi marta hech qanday kurs faol bo'lmasa — birinchisini faol qilamiz
  const active = await courseRepository.getActive();
  logger.info({ activeCourse: active?.key }, '📚 Faol kurs');

  await adminRepository.ensureSeeded(adminIds);

  logger.info('✅ Seed muvaffaqiyatli yakunlandi');
}

main()
  .catch((err) => {
    logger.error({ err }, '❌ Seed xatoligi');
    process.exit(1);
  })
  .finally(() => process.exit(0));
