export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  correctCount: number;
  totalTyped: number;
  totalGraphemes: number;
  timeElapsed: number;
  timeRemaining: number;
  progress: number;
}

export type PerformanceRating =
  | 'Beginner'
  | 'Improving'
  | 'Good'
  | 'Excellent'
  | 'Typing Master';

export function calculateStats(
  targetGraphemes: string[],
  userGraphemes: string[],
  timeElapsedSeconds: number,
  totalTimeSeconds: number = 0
): TypingStats {
  const totalGraphemes = targetGraphemes.length;
  const totalTyped = userGraphemes.length;

  let correctCount = 0;
  let errors = 0;

  for (let i = 0; i < totalTyped; i++) {
    if (i < totalGraphemes) {
      if (userGraphemes[i] === targetGraphemes[i]) {
        correctCount++;
      } else {
        errors++;
      }
    }
  }

  const minutes = timeElapsedSeconds > 0 ? timeElapsedSeconds / 60 : 0.001;
  const cpm = Math.round(correctCount / minutes);
  const wpm = Math.round(cpm / 5);
  const accuracy = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;
  const progress = totalGraphemes > 0 ? Math.min(100, Math.round((totalTyped / totalGraphemes) * 100)) : 0;
  const timeRemaining = totalTimeSeconds > 0 ? Math.max(0, totalTimeSeconds - timeElapsedSeconds) : 0;

  return {
    wpm,
    cpm,
    accuracy,
    errors,
    correctCount,
    totalTyped,
    totalGraphemes,
    timeElapsed: timeElapsedSeconds,
    timeRemaining,
    progress,
  };
}

export function getPerformanceRating(wpm: number, accuracy: number): PerformanceRating {
  if (wpm >= 60 && accuracy >= 95) return 'Typing Master';
  if (wpm >= 40 && accuracy >= 90) return 'Excellent';
  if (wpm >= 25 && accuracy >= 85) return 'Good';
  if (wpm >= 15) return 'Improving';
  return 'Beginner';
}
