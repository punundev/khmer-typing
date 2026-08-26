import { create } from 'zustand';
import { segmentGraphemes, normalizeUnicode } from '../lib/unicode';
import { calculateStats, TypingStats } from '../lib/typing';

export type LanguageMode = 'km' | 'en' | 'mixed';
export type TestType = 'time' | 'words' | 'custom';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TypingState {
  // Settings
  language: LanguageMode;
  testType: TestType;
  difficulty: Difficulty;
  timeLimit: number; // 15, 30, 60, 120
  wordLimit: number; // 10, 25, 50, 100
  customText: string;

  // Session State
  targetText: string;
  targetGraphemes: string[];
  userGraphemes: string[];
  currentIndex: number;
  isActive: boolean;
  isFinished: boolean;
  timeElapsed: number;
  soundEnabled: boolean;

  // Real-time Stats
  stats: TypingStats;

  // Actions
  setLanguage: (lang: LanguageMode) => void;
  setTestType: (type: TestType) => void;
  setDifficulty: (diff: Difficulty) => void;
  setTimeLimit: (seconds: number) => void;
  setWordLimit: (words: number) => void;
  setCustomText: (text: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  initSession: (textOverride?: string) => void;
  handleKeyPress: (key: string) => void;
  handleBackspace: () => void;
  tickTimer: () => void;
  resetSession: () => void;
}

// Sample fallback practice texts for fast initialization
const SAMPLE_TEXTS = {
  km: {
    easy: 'ក ខ កា ខា កី ខី កូ ខូ កេ ខេ កៃ ខៃ កោ ខោ កាំ ខាំ',
    medium: 'ភាសាខ្មែរជាភាសាផ្លូវការនៃព្រះរាជាណាចក្រកម្ពុជា។ ការរៀនវាយអត្ថបទខ្មែរជួយបង្កើនល្បឿន និងភាពត្រឹមត្រូវ។',
    hard: 'ព្រះរាជាណាចក្រកម្ពុជា មានប្រវត្តិសាស្ត្រ និងវប្បធម៌ដ៏យូរលង់ណាស់មកហើយ។ ប្រាសាទអង្គរវត្តជាបេតិកភណ្ឌពិភពលោកដ៏អស្ចារ្យ។',
  },
  en: {
    easy: 'the quick brown fox jumps over the lazy dog cat bat hat rat mat',
    medium: 'Learning to type faster requires consistent practice and patience. Focus on accuracy before speed.',
    hard: 'Asynchronous computer programming allows tasks to execute independently without blocking main UI execution threads.',
  },
  mixed: {
    easy: 'Khmer ភាសាខ្មែរ Hello សួស្ដី Computer កុំព្យូទ័រ Typing ការវាយអត្ថបទ',
    medium: 'Next.js និង Python FastAPI ជួយបង្កើត Web Application យ៉ាងលឿន និងមានប្រសិទ្ធភាពខ្ពស់។',
    hard: 'Developers code using Next.js for Frontend and FastAPI for Backend ជាមួយការគាំទ្រ Unicode ភាសាខ្មែរ។',
  },
};

export const useTypingStore = create<TypingState>((set, get) => ({
  language: 'km',
  testType: 'time',
  difficulty: 'easy',
  timeLimit: 30,
  wordLimit: 25,
  customText: '',

  targetText: '',
  targetGraphemes: [],
  userGraphemes: [],
  currentIndex: 0,
  isActive: false,
  isFinished: false,
  timeElapsed: 0,
  soundEnabled: true,

  stats: {
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
    correctCount: 0,
    totalTyped: 0,
    totalGraphemes: 0,
    timeElapsed: 0,
    timeRemaining: 30,
    progress: 0,
  },

  setLanguage: (lang) => {
    set({ language: lang });
    get().initSession();
  },

  setTestType: (type) => {
    set({ testType: type });
    get().initSession();
  },

  setDifficulty: (diff) => {
    set({ difficulty: diff });
    get().initSession();
  },

  setTimeLimit: (seconds) => {
    set({ timeLimit: seconds });
    get().initSession();
  },

  setWordLimit: (words) => {
    set({ wordLimit: words });
    get().initSession();
  },

  setCustomText: (text) => {
    set({ customText: text });
    if (get().testType === 'custom') {
      get().initSession(text);
    }
  },

  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

  initSession: (textOverride) => {
    const { language, difficulty, testType, customText, timeLimit } = get();

    let selectedText = textOverride || '';
    if (!selectedText) {
      if (testType === 'custom' && customText) {
        selectedText = customText;
      } else {
        selectedText = SAMPLE_TEXTS[language][difficulty];
      }
    }

    const normalized = normalizeUnicode(selectedText);
    const graphemes = segmentGraphemes(normalized, language);

    set({
      targetText: normalized,
      targetGraphemes: graphemes,
      userGraphemes: [],
      currentIndex: 0,
      isActive: false,
      isFinished: false,
      timeElapsed: 0,
      stats: {
        wpm: 0,
        cpm: 0,
        accuracy: 100,
        errors: 0,
        correctCount: 0,
        totalTyped: 0,
        totalGraphemes: graphemes.length,
        timeElapsed: 0,
        timeRemaining: testType === 'time' ? timeLimit : 0,
        progress: 0,
      },
    });
  },

  handleKeyPress: (key) => {
    const state = get();
    if (state.isFinished) return;

    if (!state.isActive) {
      set({ isActive: true });
    }

    const userGraphemes = [...state.userGraphemes, key];
    const currentIndex = userGraphemes.length;
    const targetGraphemes = state.targetGraphemes;
    const isFinished =
      currentIndex >= targetGraphemes.length ||
      (state.testType === 'time' && state.stats.timeRemaining <= 0);

    const stats = calculateStats(
      targetGraphemes,
      userGraphemes,
      state.timeElapsed,
      state.timeLimit
    );

    set({
      userGraphemes,
      currentIndex,
      isFinished,
      isActive: !isFinished,
      stats,
    });
  },

  handleBackspace: () => {
    const state = get();
    if (state.isFinished || state.userGraphemes.length === 0) return;

    const userGraphemes = state.userGraphemes.slice(0, -1);
    const currentIndex = userGraphemes.length;
    const stats = calculateStats(
      state.targetGraphemes,
      userGraphemes,
      state.timeElapsed,
      state.timeLimit
    );

    set({
      userGraphemes,
      currentIndex,
      stats,
    });
  },

  tickTimer: () => {
    const state = get();
    if (!state.isActive || state.isFinished) return;

    const newTimeElapsed = state.timeElapsed + 1;
    const timeRemaining =
      state.testType === 'time' ? Math.max(0, state.timeLimit - newTimeElapsed) : 0;

    const isFinished =
      state.testType === 'time' && timeRemaining <= 0;

    const stats = calculateStats(
      state.targetGraphemes,
      state.userGraphemes,
      newTimeElapsed,
      state.timeLimit
    );

    set({
      timeElapsed: newTimeElapsed,
      isFinished: state.isFinished || isFinished,
      isActive: !(state.isFinished || isFinished),
      stats,
    });
  },

  resetSession: () => {
    get().initSession();
  },
}));
