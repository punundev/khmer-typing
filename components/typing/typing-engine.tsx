'use client';

import * as React from 'react';
import { useTypingStore } from '@/stores/typing-store';
import { TypingSettings } from './typing-settings';
import { TypingText } from './typing-text';
import { TypingStatsHUD } from './typing-stats';
import { VirtualKeyboard } from '../keyboard/virtual-keyboard';
import { segmentGraphemes, normalizeUnicode } from '@/lib/unicode';
import { RefreshCw, Play } from 'lucide-react';

export function TypingEngine() {
  const {
    isActive,
    isFinished,
    handleKeyPress,
    handleBackspace,
    tickTimer,
    initSession,
    resetSession,
    soundEnabled,
  } = useTypingStore();

  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input automatically on mount or click
  React.useEffect(() => {
    initSession();
  }, [initSession]);

  // Timer interval effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isFinished) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isFinished, tickTimer]);

  // Play subtle keyboard click sound
  const playClickSound = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // AudioContext unavailable
    }
  }, [soundEnabled]);

  // Keydown handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setActiveKey(e.code);
    setTimeout(() => setActiveKey(null), 150);

    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
      playClickSound();
      return;
    }

    if (e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault();
      resetSession();
      return;
    }
  };

  // Input change handler for complex IME / Khmer compositing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;

    // Segment input graphemes
    const graphemes = segmentGraphemes(normalizeUnicode(val));
    for (const g of graphemes) {
      handleKeyPress(g);
      playClickSound();
    }

    // Reset input value to keep capturing next grapheme
    e.target.value = '';
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 cursor-text select-none"
    >
      {/* Hidden input field for capturing physical keyboard events */}
      <input
        ref={inputRef}
        type="text"
        className="sr-only opacity-0 absolute pointer-events-none"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        autoFocus
        tabIndex={0}
      />

      {/* Settings Toolbar */}
      <TypingSettings />

      {/* Typing Text Box */}
      <div className="relative group">
        <TypingText />

        {/* Start / Focus Prompt Overlay */}
        {!isActive && !isFinished && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] rounded-2xl transition-opacity">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-card border border-border shadow-lg text-sm font-medium animate-bounce">
              <Play className="w-4 h-4 text-primary fill-primary" />
              <span className="font-khmer">ចុចទីនេះ ឬ ចាប់ផ្តើមវាយអក្សរ (Click or start typing to begin)</span>
            </div>
          </div>
        )}
      </div>

      {/* Live Stats HUD */}
      <TypingStatsHUD />

      {/* Restart Button */}
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetSession();
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-border bg-card/60 hover:bg-muted/80 text-sm font-medium transition-all shadow-sm group"
        >
          <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-khmer">ចាប់ផ្តើមឡើងវិញ (Restart)</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-muted rounded border ml-2">Tab</kbd>
        </button>
      </div>

      {/* Interactive Virtual Keyboard */}
      <VirtualKeyboard activeKeyPressed={activeKey} />
    </div>
  );
}
