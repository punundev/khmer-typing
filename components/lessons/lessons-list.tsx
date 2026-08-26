'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTypingStore } from '@/stores/typing-store';
import { LessonItem } from '@/actions/lessons';
import { Star, CheckCircle, Play } from 'lucide-react';

interface LessonsListProps {
  initialLessons: LessonItem[];
}

export function LessonsList({ initialLessons }: LessonsListProps) {
  const { setCustomText, setTestType } = useTypingStore();

  const handleStartLesson = (lesson: LessonItem) => {
    setCustomText(lesson.content);
    setTestType('custom');
  };

  return (
    <div className="space-y-8">
      {(['beginner', 'intermediate', 'advanced'] as const).map((cat) => {
        const catLessons = initialLessons.filter((l) => l.category === cat);
        const catTitle =
          cat === 'beginner'
            ? 'កម្រិតដំបូង (Beginner)'
            : cat === 'intermediate'
            ? 'កម្រិតមធ្យម (Intermediate)'
            : 'កម្រិតខ្ពស់ (Advanced)';

        return (
          <div key={cat} className="space-y-4">
            <h2 className="text-xl font-bold font-khmer flex items-center gap-2 border-b border-border/60 pb-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>{catTitle}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-card/70 border border-border/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {lesson.estimatedTime}
                      </span>
                      <CheckCircle className="w-4 h-4 text-muted-foreground/40 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg font-khmer group-hover:text-primary transition-colors">
                      {lesson.titleKm}
                    </h3>
                    <p className="text-xs text-muted-foreground font-khmer">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="bg-muted/40 p-3 rounded-xl border border-border/40 font-khmer text-xs text-muted-foreground truncate">
                    "{lesson.content}"
                  </div>

                  <Link
                    href="/"
                    onClick={() => handleStartLesson(lesson)}
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <Play className="w-4 h-4 fill-primary-foreground" />
                    <span className="font-khmer">ចាប់ផ្តើមមេរៀន (Start Lesson)</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
