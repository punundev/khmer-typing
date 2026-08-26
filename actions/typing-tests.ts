'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const createTypingTestSchema = z.object({
  userId: z.string().optional(),
  language: z.enum(['km', 'en', 'mixed']),
  mode: z.enum(['time', 'words', 'custom']),
  duration: z.number().min(0),
  wpm: z.number().min(0),
  cpm: z.number().min(0),
  accuracy: z.number().min(0).max(100),
  errors: z.number().min(0),
});

export type CreateTypingTestInput = z.infer<typeof createTypingTestSchema>;

export async function saveTypingTest(input: CreateTypingTestInput) {
  try {
    const validated = createTypingTestSchema.parse(input);

    const testResult = await prisma.typingTest.create({
      data: {
        userId: validated.userId,
        language: validated.language,
        mode: validated.mode,
        duration: validated.duration,
        wpm: validated.wpm,
        cpm: validated.cpm,
        accuracy: validated.accuracy,
        errors: validated.errors,
      },
    });

    revalidatePath('/dashboard');
    revalidatePath('/api/statistics');

    return { success: true, data: testResult };
  } catch (error: any) {
    console.error('Error saving typing test:', error);
    return { success: false, error: error.message || 'Failed to save typing test result' };
  }
}
