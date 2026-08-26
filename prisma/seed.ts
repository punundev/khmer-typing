import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_TSEl8Dm5GtIQ@ep-jolly-rain-b3c38xm1-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

async function main() {
  console.log('Seeding Neon PostgreSQL database...');

  // Seed Lessons
  const lessons = [
    {
      id: 'lesson-1',
      title: 'Lesson 1: Home Row Consonants',
      titleKm: 'មេរៀនទី១: ព្យញ្ជនៈជួរដើម (Home Row)',
      language: 'km',
      difficulty: 'beginner',
      description: 'រៀនវាយព្យញ្ជនៈគ្រឹះ ក ខ គ ឃ ង ច ឆ ជ ឈ ញ',
      content: 'ក ខ គ ឃ ង ច ឆ ជ ឈ ញ ក ខ គ ឃ ង',
    },
    {
      id: 'lesson-2',
      title: 'Lesson 2: Khmer Dependent Vowels',
      titleKm: 'មេរៀនទី២: ស្រះនិស្ស័យ (Khmer Vowels)',
      language: 'km',
      difficulty: 'beginner',
      description: 'រៀនវាយស្រះ ា ិ ី ឹ ឺ ុ ូ ួ ើ ឿ ៀ េ ែ ៃ ោ ៅ',
      content: 'កា កិ កី កឹ កឺ កុ កូ កួ កើ កឿ កៀ កេ កែ កៃ កោ កៅ',
    },
    {
      id: 'lesson-3',
      title: 'Lesson 3: Subscript Consonants',
      titleKm: 'មេរៀនទី៣: ជើងព្យញ្ជនៈ (Subscripts)',
      language: 'km',
      difficulty: 'intermediate',
      description: 'រៀនវាយជើងព្យញ្ជនៈដោយប្រើសញ្ញា (្) + ព្យញ្ជនៈ',
      content: 'ខ្ញុំ ខ្មែរ ត្រី ស្រី ផ្លូវ ស្ពាន គ្រូ ព្រះ',
    },
    {
      id: 'lesson-4',
      title: 'Lesson 4: Khmer Numerals & Punctuation',
      titleKm: 'មេរៀនទី៤: លេខ និង សញ្ញាខ្មែរ (Khmer Numerals & Symbols)',
      language: 'km',
      difficulty: 'intermediate',
      description: 'រៀនវាយលេខ ០ ១ ២ ៣ ៤ ៥ ៦ ៧ ៨ ៩ និងសញ្ញា ៖ ញ',
      content: 'ឆ្នាំ ២០២៦ មាន ១២ ខែ និង ៣៦៥ ថ្ងៃ។ ភាសាខ្មែរ៖ អក្សរសាស្ត្រ។',
    },
    {
      id: 'lesson-5',
      title: 'Lesson 5: Khmer Paragraph Practice',
      titleKm: 'មេរៀនទី៥: អត្ថបទវែងខ្មែរ (Long Paragraphs)',
      language: 'km',
      difficulty: 'advanced',
      description: 'វាយអត្ថបទវែងដើម្បីបង្កើនល្បឿន និងភាពស្ទាត់ជំនាញ',
      content: 'ការសិក្សាអក្សរសាស្ត្រខ្មែរជាកាតព្វកិច្ចរបស់កូនខ្មែរគ្រប់រូប។ យើងត្រូវរួមគ្នានាំគ្នាថែរក្សា និងអភិវឌ្ឍភាសាជាតិឲ្យបានគង់វង្ស។',
    },
    {
      id: 'lesson-6',
      title: 'Lesson 6: Mixed Technology & English',
      titleKm: 'មេរៀនទី៦: Mixed Khmer & English Coding',
      language: 'mixed',
      difficulty: 'advanced',
      description: 'រៀនវាយបច្ចេកវិទ្យា និងពាក្យ mixed English',
      content: 'Next.js 14 and FastAPI with PostgreSQL support Khmer Unicode typing correctly.',
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: lesson,
      create: lesson,
    });
  }

  // Seed Achievements
  const achievements = [
    {
      id: 'ach-1',
      name: 'First Step',
      nameKm: 'ជំហានដំបូង',
      description: 'Complete your first typing practice test.',
      icon: '🌱',
    },
    {
      id: 'ach-2',
      name: 'Speed Demon',
      nameKm: 'ល្បឿនលឿនដូចផ្លេកបន្ទោរ',
      description: 'Reach 40+ WPM on a Khmer typing test.',
      icon: '⚡',
    },
    {
      id: 'ach-3',
      name: 'Accuracy Master',
      nameKm: 'មេប្រឡងត្រឹមត្រូវ 100%',
      description: 'Achieve 100% accuracy on any test.',
      icon: '🎯',
    },
    {
      id: 'ach-4',
      name: 'Khmer Scholar',
      nameKm: 'អ្នកប្រកបអក្សរខ្មែរ',
      description: 'Complete 10 Khmer typing exercises.',
      icon: '🇰🇭',
    },
    {
      id: 'ach-5',
      name: '7-Day Streak',
      nameKm: 'ហ្វឹកហាត់ ៧ ថ្ងៃជាប់គ្នា',
      description: 'Practice typing 7 days in a row.',
      icon: '🔥',
    },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { id: ach.id },
      update: ach,
      create: ach,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
