'use client';

import * as React from 'react';
import { useTypingStore } from '@/stores/typing-store';

export function TypingText() {
  const { targetGraphemes, userGraphemes, currentIndex, language } = useTypingStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentRef = React.useRef<HTMLSpanElement>(null);

  // Auto-scroll logic to keep current grapheme centered
  React.useEffect(() => {
    if (currentRef.current && containerRef.current) {
      const container = containerRef.current;
      const current = currentRef.current;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elemTop = current.offsetTop;
      const elemBottom = elemTop + current.offsetHeight;

      if (elemTop < containerTop || elemBottom > containerBottom) {
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[160px] max-h-[220px] overflow-y-auto p-6 bg-card/80 border border-border/80 rounded-2xl shadow-inner select-none font-khmer text-2xl sm:text-3xl leading-relaxed tracking-normal transition-all"
    >
      <div className="flex flex-wrap gap-y-2 gap-x-1 items-baseline">
        {targetGraphemes.map((grapheme, idx) => {
          const isTyped = idx < userGraphemes.length;
          const isCorrect = isTyped && userGraphemes[idx] === grapheme;
          const isIncorrect = isTyped && userGraphemes[idx] !== grapheme;
          const isCurrent = idx === currentIndex;

          let stateClass = 'grapheme-untyped text-muted-foreground/60';
          if (isCorrect) {
            stateClass = 'grapheme-correct font-semibold text-emerald-500 dark:text-emerald-400';
          } else if (isIncorrect) {
            stateClass = 'grapheme-incorrect text-rose-500 font-bold bg-rose-500/10 underline decoration-rose-500';
          } else if (isCurrent) {
            stateClass = 'grapheme-current text-primary font-bold bg-primary/20 rounded-md border-b-2 border-primary animate-pulse';
          }

          const displayChar = grapheme === ' ' ? '␣' : grapheme;

          return (
            <span
              key={idx}
              ref={isCurrent ? currentRef : null}
              className={`grapheme-unit transition-all duration-75 ${stateClass} ${
                grapheme === ' ' ? 'opacity-40 px-1' : ''
              }`}
            >
              {displayChar}
            </span>
          );
        })}
      </div>
    </div>
  );
}
