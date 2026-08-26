'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Keyboard, BookOpen, LayoutDashboard, Volume2, VolumeX } from 'lucide-react';
import { useTypingStore } from '@/stores/typing-store';

export function Header() {
  const pathname = usePathname();
  const { soundEnabled, setSoundEnabled } = useTypingStore();

  const navLinks = [
    { href: '/', label: 'Practice (វាយអក្សរ)', icon: Keyboard },
    { href: '/lessons', label: 'Lessons (មេរៀន)', icon: BookOpen },
    { href: '/dashboard', label: 'Dashboard (ស្ថិតិ)', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 text-white font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-khmer">ខ្មែរ</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight">
              Khmer<span className="text-primary">Type</span>
            </span>
            <span className="text-xs text-muted-foreground font-khmer">រៀនវាយអក្សរខ្មែរ & English</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 bg-muted/40 p-1.5 rounded-full border border-border/40">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
