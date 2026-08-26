'use client';

import * as React from 'react';
import confetti from 'canvas-confetti';
import { useTypingStore } from '@/stores/typing-store';
import { getPerformanceRating } from '@/lib/typing';
import { saveTypingTest } from '@/actions/typing-tests';
import { Trophy, RefreshCw, Zap, Target, AlertCircle, Award } from 'lucide-react';

export function TypingStatsHUD() {
  const { stats, testType, isFinished, resetSession, language } = useTypingStore();
  const savedRef = React.useRef(false);

  React.useEffect(() => {
    if (isFinished && !savedRef.current) {
      savedRef.current = true;
      if (stats.accuracy >= 70) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      saveTypingTest({
        language: language,
        mode: testType,
        duration: stats.timeElapsed,
        wpm: stats.wpm,
        cpm: stats.cpm,
        accuracy: stats.accuracy,
        errors: stats.errors,
      }).catch((err) => console.error('Failed to save typing test:', err));
    }

    if (!isFinished) {
      savedRef.current = false;
    }
  }, [isFinished, stats, language, testType]);

  const rating = getPerformanceRating(stats.wpm, stats.accuracy);

  return (
    <div className="w-full space-y-4">
      {/* Live HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-card/40 border border-border/40 p-4 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center space-x-3 p-2 bg-background/50 rounded-xl border border-border/20">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Speed (WPM)</div>
            <div className="text-xl font-bold tracking-tight text-foreground">{stats.wpm}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-2 bg-background/50 rounded-xl border border-border/20">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Accuracy</div>
            <div className="text-xl font-bold tracking-tight text-foreground">{stats.accuracy}%</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-2 bg-background/50 rounded-xl border border-border/20">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">CPM</div>
            <div className="text-xl font-bold tracking-tight text-foreground">{stats.cpm}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-2 bg-background/50 rounded-xl border border-border/20">
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">
              {testType === 'time' ? 'Time Remaining' : 'Errors'}
            </div>
            <div className="text-xl font-bold tracking-tight text-foreground">
              {testType === 'time' ? `${stats.timeRemaining}s` : stats.errors}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted/40 h-2.5 rounded-full overflow-hidden border border-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 rounded-full"
          style={{ width: `${stats.progress}%` }}
        />
      </div>

      {/* Finished Result Modal */}
      {isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in zoom-in-95">
          <div className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 shadow-2xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-500/20">
              <Award className="w-12 h-12" />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-khmer">លទ្ធផលរបស់អ្នក! 🎉</h2>
              <p className="text-sm text-muted-foreground mt-1">Great job! Here is your typing performance summary.</p>
              <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm">
                Rating: {rating}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-muted/30 p-4 rounded-2xl text-left border border-border/40">
              <div>
                <span className="text-xs text-muted-foreground">Speed (WPM)</span>
                <p className="text-2xl font-bold text-primary">{stats.wpm}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Accuracy</span>
                <p className="text-2xl font-bold text-emerald-500">{stats.accuracy}%</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">CPM</span>
                <p className="text-lg font-semibold">{stats.cpm}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Total Errors</span>
                <p className="text-lg font-semibold text-rose-500">{stats.errors}</p>
              </div>
            </div>

            <button
              onClick={resetSession}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-khmer">ព្យាយាមម្តងទៀត (Try Again)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
