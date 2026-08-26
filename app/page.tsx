import { TypingEngine } from '@/components/typing/typing-engine';

export default function HomePage() {
  return (
    <div className="py-4 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-khmer">
          រៀនវាយអក្សរខ្មែរ <span className="text-primary">& English</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-khmer">
          បង្កើនល្បឿន និងភាពត្រឹមត្រូវនៃការវាយអត្ថបទខ្មែរ ដោយសប្បាយរីករាយ!
        </p>
      </div>

      <TypingEngine />
    </div>
  );
}
