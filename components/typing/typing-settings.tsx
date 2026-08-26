'use client';

import * as React from 'react';
import { useTypingStore, LanguageMode, TestType, Difficulty } from '@/stores/typing-store';
import { Globe, Clock, FileText, Sparkles, SlidersHorizontal, Plus } from 'lucide-react';

export function TypingSettings() {
  const {
    language,
    setLanguage,
    testType,
    setTestType,
    difficulty,
    setDifficulty,
    timeLimit,
    setTimeLimit,
    wordLimit,
    setWordLimit,
    customText,
    setCustomText,
  } = useTypingStore();

  const [showCustomModal, setShowCustomModal] = React.useState(false);
  const [customInput, setCustomInput] = React.useState(customText);

  const languages: { id: LanguageMode; label: string; sub: string }[] = [
    { id: 'km', label: 'ភាសាខ្មែរ', sub: 'Khmer' },
    { id: 'en', label: 'English', sub: 'អង់គ្លេស' },
    { id: 'mixed', label: 'Mixed', sub: 'ចម្រុះ' },
  ];

  const testTypes: { id: TestType; label: string; icon: any }[] = [
    { id: 'time', label: 'Time (ពេល)', icon: Clock },
    { id: 'words', label: 'Words (ពាក្យ)', icon: FileText },
    { id: 'custom', label: 'Custom (ផ្ទាល់ខ្លួន)', icon: Plus },
  ];

  const difficulties: { id: Difficulty; label: string }[] = [
    { id: 'easy', label: 'Easy (ងាយ)' },
    { id: 'medium', label: 'Medium (មធ្យម)' },
    { id: 'hard', label: 'Hard (ពិបាក)' },
  ];

  const times = [15, 30, 60, 120];
  const words = [10, 25, 50, 100];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomText(customInput);
    setTestType('custom');
    setShowCustomModal(false);
  };

  return (
    <div className="w-full bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4 shadow-sm mb-6 transition-all hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Language selector */}
        <div className="flex items-center space-x-1.5 bg-muted/50 p-1 rounded-xl">
          <Globe className="w-4 h-4 ml-2 text-muted-foreground hidden sm:inline-block" />
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                language === lang.id
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="font-khmer">{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Mode selector */}
        <div className="flex items-center space-x-1 bg-muted/50 p-1 rounded-xl">
          {testTypes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  if (mode.id === 'custom') {
                    setShowCustomModal(true);
                  } else {
                    setTestType(mode.id);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                  testType === mode.id
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic sub-options: Time / Words / Difficulty */}
        <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-xl">
          {testType === 'time' && (
            <div className="flex items-center space-x-1">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeLimit(t)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    timeLimit === t
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          )}

          {testType === 'words' && (
            <div className="flex items-center space-x-1">
              {words.map((w) => (
                <button
                  key={w}
                  onClick={() => setWordLimit(w)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    wordLimit === w
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {w}w
                </button>
              ))}
            </div>
          )}

          {/* Difficulty options */}
          <div className="flex items-center space-x-1 pl-2 border-l border-border/60">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground hidden sm:inline-block" />
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setDifficulty(diff.id)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                  difficulty === diff.id
                    ? 'bg-secondary text-secondary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Text Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Custom Typing Text (អត្ថបទផ្ទាល់ខ្លួន)</span>
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Paste or type any Khmer, English, or mixed paragraph below to start a custom practice test.
              </p>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="បញ្ចូលអត្ថបទខ្មែរ ឬ English នៅទីនេះ..."
                rows={5}
                className="w-full p-3 font-khmer text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-sm rounded-xl border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                >
                  Start Typing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
