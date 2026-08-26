'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 border rounded-full bg-muted animate-pulse" />;
  }

  return (
    <div className="flex items-center bg-muted/60 p-1 rounded-full border border-border/50">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'light'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'dark'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'system'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="System Preference"
        aria-label="System Preference"
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
}
