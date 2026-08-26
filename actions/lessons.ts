'use server';

import { prisma } from '@/lib/prisma';

export interface LessonItem {
  id: string;
  title: string;
  titleKm: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  content: string;
  estimatedTime: string;
}

const DEFAULT_LESSONS: LessonItem[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: Home Row Consonants',
    titleKm: 'មេរៀនទី១: ព្យញ្ជនៈជួរដើម (Home Row)',
    category: 'beginner',
    description: 'រៀនវាយព្យញ្ជនៈគ្រឹះ ក ខ គ ឃ ង ច ឆ ជ ឈ ញ',
    content: 'ក ខ គ ឃ ង ច ឆ ជ ឈ ញ ក ខ គ ឃ ង',
    estimatedTime: '3 min',
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: Khmer Dependent Vowels',
    titleKm: 'មេរៀនទី២: ស្រះនិស្ស័យ (Khmer Vowels)',
    category: 'beginner',
    description: 'រៀនវាយស្រះ ា ិ ី ឹ ឺ ុ ូ ួ ើ ឿ ៀ េ ែ ៃ ោ ៅ',
    content: 'កា កិ កី កឹ កឺ កុ កូ កួ កើ កឿ កៀ កេ កែ កៃ កោ កៅ',
    estimatedTime: '5 min',
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: Subscript Consonants',
    titleKm: 'មេរៀនទី៣: ជើងព្យញ្ជនៈ (Subscripts)',
    category: 'intermediate',
    description: 'រៀនវាយជើងព្យញ្ជនៈដោយប្រើសញ្ញា (្) + ព្យញ្ជនៈ',
    content: 'ខ្ញុំ ខ្មែរ ត្រី ស្រី ផ្លូវ ស្ពាន គ្រូ ព្រះ',
    estimatedTime: '6 min',
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4: Khmer Numerals & Punctuation',
    titleKm: 'មេរៀនទី៤: លេខ និង សញ្ញាខ្មែរ (Khmer Numerals & Symbols)',
    category: 'intermediate',
    description: 'រៀនវាយលេខ ០ ១ ២ ៣ ៤ ៥ ៦ ៧ ៨ ៩ និងសញ្ញា ៖ ញ',
    content: 'ឆ្នាំ ២០២៦ មាន ១២ ខែ និង ៣៦៥ ថ្ងៃ។ ភាសាខ្មែរ៖ អក្សរសាស្ត្រ។',
    estimatedTime: '4 min',
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5: Khmer Paragraph Practice',
    titleKm: 'មេរៀនទី៥: អត្ថបទវែងខ្មែរ (Long Paragraphs)',
    category: 'advanced',
    description: 'វាយអត្ថបទវែងដើម្បីបង្កើនល្បឿន និងភាពស្ទាត់ជំនាញ',
    content: 'ការសិក្សាអក្សរសាស្ត្រខ្មែរជាកាតព្វកិច្ចរបស់កូនខ្មែរគ្រប់រូប។ យើងត្រូវរួមគ្នានាំគ្នាថែរក្សា និងអភិវឌ្ឍភាសាជាតិឲ្យបានគង់វង្ស។',
    estimatedTime: '8 min',
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6: Mixed Technology & English',
    titleKm: 'មេរៀនទី៦: Mixed Khmer & English Coding',
    category: 'advanced',
    description: 'រៀនវាយបច្ចេកវិទ្យា និងពាក្យ mixed English',
    content: 'Next.js 14 and FastAPI with PostgreSQL support Khmer Unicode typing correctly.',
    estimatedTime: '7 min',
  },
];

export async function getLessons(): Promise<LessonItem[]> {
  try {
    const dbLessons = await prisma.lesson.findMany();

    if (dbLessons.length === 0) {
      return DEFAULT_LESSONS;
    }

    return dbLessons.map((l) => ({
      id: l.id,
      title: l.title,
      titleKm: l.titleKm,
      category: l.difficulty as 'beginner' | 'intermediate' | 'advanced',
      description: l.description,
      content: l.content,
      estimatedTime: '5 min',
    }));
  } catch (error) {
    return DEFAULT_LESSONS;
  }
}
