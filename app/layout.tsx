import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Header } from '@/components/ui/header';

export const metadata: Metadata = {
  title: 'KhmerType - Khmer & English Typing Practice | រៀនវាយអក្សរខ្មែរ',
  description:
    'A modern, kid-friendly typing practice web application designed specifically for Khmer and English learners. Practice Khmer Unicode typing, track WPM, accuracy, and unlock achievements.',
  keywords: ['Khmer Typing', 'រៀនវាយអក្សរខ្មែរ', 'Khmer Unicode', 'Typing Practice', 'Monkeytype Khmer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 container px-4 py-6 mx-auto max-w-6xl">
            {children}
          </main>
          <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground font-khmer">
            KhmerType © 2026 • ផលិតឡើងដោយក្ដីស្រឡាញ់ សម្រាប់សិស្សានុសិស្ស និងអ្នកសិក្សាភាសាខ្មែរ
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
