'use client';

import * as React from 'react';
import { useTypingStore } from '@/stores/typing-store';
import { ENGLISH_LAYOUT, KHMER_NIDA_LAYOUT, KeyboardLayout } from '@/lib/keyboard-layouts';

interface VirtualKeyboardProps {
  activeKeyPressed?: string | null;
}

export function VirtualKeyboard({ activeKeyPressed }: VirtualKeyboardProps) {
  const { language, targetGraphemes, currentIndex } = useTypingStore();
  const [layoutMode, setLayoutMode] = React.useState<'english' | 'khmer'>(
    language === 'km' ? 'khmer' : 'english'
  );
  const [isShiftPressed] = React.useState(false);

  React.useEffect(() => {
    setLayoutMode(language === 'km' ? 'khmer' : 'english');
  }, [language]);

  const activeLayout: KeyboardLayout =
    layoutMode === 'khmer' ? KHMER_NIDA_LAYOUT : ENGLISH_LAYOUT;

  const targetChar = targetGraphemes[currentIndex] || '';

  return (
    <div className="w-full bg-card/60 border border-border/60 rounded-3xl p-4 sm:p-6 shadow-sm backdrop-blur-md space-y-4">
      {/* Keyboard Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Layout:
          </span>
          <button
            onClick={() => setLayoutMode(layoutMode === 'english' ? 'khmer' : 'english')}
            className="px-3 py-1 text-xs font-bold rounded-lg bg-muted hover:bg-muted/80 transition-colors font-khmer border border-border/40"
          >
            {activeLayout.name}
          </button>
        </div>
        <div className="text-xs text-muted-foreground hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded border text-[10px]">Shift</kbd> to view shifted Khmer symbols/vowels
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="flex flex-col gap-1.5 sm:gap-2 select-none overflow-x-auto pb-2">
        {activeLayout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 min-w-[640px]">
            {row.map((key) => {
              const isTargetKey =
                targetChar &&
                (key.label === targetChar ||
                  key.shiftLabel === targetChar ||
                  (key.code === 'Space' && targetChar === ' '));

              const isPressed = activeKeyPressed === key.code || activeKeyPressed === key.label;

              let keyStyle =
                'bg-muted/60 text-foreground border-border/50 hover:bg-muted shadow-sm';

              if (isTargetKey) {
                keyStyle =
                  'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30 ring-2 ring-primary/40 animate-pulse font-bold';
              } else if (isPressed) {
                keyStyle =
                  'bg-secondary text-secondary-foreground border-primary/50 scale-95 transition-transform';
              }

              const displayLabel = isShiftPressed && key.shiftLabel ? key.shiftLabel : key.label;

              return (
                <div
                  key={key.code}
                  className={`flex flex-col items-center justify-center h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-khmer transition-all border ${
                    key.width || 'flex-1 min-w-[36px] sm:min-w-[44px]'
                  } ${keyStyle}`}
                >
                  <span className="font-medium leading-none">{displayLabel}</span>
                  {key.shiftLabel && !isShiftPressed && (
                    <span className="text-[9px] text-muted-foreground/60 leading-none mt-0.5">
                      {key.shiftLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
