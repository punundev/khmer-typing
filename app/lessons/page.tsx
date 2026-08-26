import { getLessons } from '@/actions/lessons';
import { LessonsList } from '@/components/lessons/lessons-list';
import { BookOpen } from 'lucide-react';

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-khmer flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          <span>មេរៀនហ្វឹកហាត់ (Typing Lessons)</span>
        </h1>
        <p className="text-muted-foreground text-sm font-khmer max-w-xl mx-auto">
          ជ្រើសរើសមេរៀនតាមកម្រិត ដើម្បីបង្កើនសមត្ថភាពវាយអក្សរខ្មែរ និង English ពីកម្រិតដំបូង ដល់កម្រិតស្ទាត់ជំនាញ។
        </p>
      </div>

      <LessonsList initialLessons={lessons} />
    </div>
  );
}
