export function segmentGraphemes(text: string, locale: 'km' | 'en' | 'mixed' = 'km'): string[] {
  if (!text) return [];

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const lang = locale === 'km' ? 'km-KH' : locale === 'en' ? 'en-US' : 'km';
    const segmenter = new Intl.Segmenter(lang, { granularity: 'grapheme' });
    const segments = segmenter.segment(text);
    return Array.from(segments).map((s) => s.segment);
  }

  return Array.from(text);
}

export function normalizeUnicode(text: string): string {
  if (!text) return '';
  return text.normalize('NFC');
}

export function isKhmerGrapheme(grapheme: string): boolean {
  const khmerRegex = /[\u1780-\u17FF\u19E0-\u19FF]/;
  return khmerRegex.test(grapheme);
}
