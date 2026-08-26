'use server';

import { prisma } from '@/lib/prisma';

export interface DashboardStatsResult {
  bestWpm: number;
  bestAccuracy: number;
  totalTests: number;
  totalPracticeSeconds: number;
  streakDays: number;
  history: Array<{ test: string; wpm: number; accuracy: number }>;
}

export async function getDashboardStats(): Promise<DashboardStatsResult> {
  try {
    const tests = await prisma.typingTest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    if (tests.length === 0) {
      return {
        bestWpm: 0,
        bestAccuracy: 0,
        totalTests: 0,
        totalPracticeSeconds: 0,
        streakDays: 0,
        history: [],
      };
    }

    const bestWpm = Math.max(...tests.map((t) => t.wpm));
    const bestAccuracy = Math.max(...tests.map((t) => t.accuracy));
    const totalTests = tests.length;
    const totalPracticeSeconds = tests.reduce((acc, t) => acc + t.duration, 0);

    const history = [...tests].reverse().map((t, idx) => ({
      test: `Test ${idx + 1}`,
      wpm: t.wpm,
      accuracy: Math.round(t.accuracy),
    }));

    return {
      bestWpm,
      bestAccuracy,
      totalTests,
      totalPracticeSeconds,
      streakDays: Math.min(7, totalTests),
      history,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats from DB:', error);
    return {
      bestWpm: 0,
      bestAccuracy: 0,
      totalTests: 0,
      totalPracticeSeconds: 0,
      streakDays: 0,
      history: [],
    };
  }
}
