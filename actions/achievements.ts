'use server';

import { prisma } from '../lib/prisma';

export interface AchievementItem {
  id: string;
  name: string;
  nameKm: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    name: 'First Step',
    nameKm: 'ជំហានដំបូង',
    description: 'Complete your first typing practice test.',
    icon: '🌱',
    unlocked: true,
  },
  {
    id: 'ach-2',
    name: 'Speed Demon',
    nameKm: 'ល្បឿនលឿនដូចផ្លេកបន្ទោរ',
    description: 'Reach 40+ WPM on a Khmer typing test.',
    icon: '⚡',
    unlocked: true,
  },
  {
    id: 'ach-3',
    name: 'Accuracy Master',
    nameKm: 'មេប្រឡងត្រឹមត្រូវ 100%',
    description: 'Achieve 100% accuracy on any test.',
    icon: '🎯',
    unlocked: true,
  },
  {
    id: 'ach-4',
    name: 'Khmer Scholar',
    nameKm: 'អ្នកប្រកបអក្សរខ្មែរ',
    description: 'Complete 10 Khmer typing exercises.',
    icon: '🇰🇭',
    unlocked: false,
  },
  {
    id: 'ach-5',
    name: '7-Day Streak',
    nameKm: 'ហ្វឹកហាត់ ៧ ថ្ងៃជាប់គ្នា',
    description: 'Practice typing 7 days in a row.',
    icon: '🔥',
    unlocked: false,
  },
];

export async function getAchievements(): Promise<AchievementItem[]> {
  try {
    const dbAchievements = await prisma.achievement.findMany();
    if (dbAchievements.length === 0) {
      return DEFAULT_ACHIEVEMENTS;
    }
    return dbAchievements.map((a) => ({
      id: a.id,
      name: a.name,
      nameKm: a.nameKm,
      description: a.description,
      icon: a.icon,
      unlocked: true,
    }));
  } catch (error) {
    return DEFAULT_ACHIEVEMENTS;
  }
}
