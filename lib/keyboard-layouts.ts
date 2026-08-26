export interface KeyConfig {
  code: string;
  label: string;
  shiftLabel?: string;
  subscriptLabel?: string;
  width?: string;
  isSpecial?: boolean;
}

export type KeyboardRow = KeyConfig[];

export interface KeyboardLayout {
  id: 'english' | 'khmer';
  name: string;
  rows: KeyboardRow[];
}

export const ENGLISH_LAYOUT: KeyboardLayout = {
  id: 'english',
  name: 'English QWERTY',
  rows: [
    [
      { code: 'Backquote', label: '`', shiftLabel: '~' },
      { code: 'Digit1', label: '1', shiftLabel: '!' },
      { code: 'Digit2', label: '2', shiftLabel: '@' },
      { code: 'Digit3', label: '3', shiftLabel: '#' },
      { code: 'Digit4', label: '4', shiftLabel: '$' },
      { code: 'Digit5', label: '5', shiftLabel: '%' },
      { code: 'Digit6', label: '6', shiftLabel: '^' },
      { code: 'Digit7', label: '7', shiftLabel: '&' },
      { code: 'Digit8', label: '8', shiftLabel: '*' },
      { code: 'Digit9', label: '9', shiftLabel: '(' },
      { code: 'Digit0', label: '0', shiftLabel: ')' },
      { code: 'Minus', label: '-', shiftLabel: '_' },
      { code: 'Equal', label: '=', shiftLabel: '+' },
      { code: 'Backspace', label: 'Backspace', width: 'w-20', isSpecial: true },
    ],
    [
      { code: 'Tab', label: 'Tab', width: 'w-14', isSpecial: true },
      { code: 'KeyQ', label: 'q', shiftLabel: 'Q' },
      { code: 'KeyW', label: 'w', shiftLabel: 'W' },
      { code: 'KeyE', label: 'e', shiftLabel: 'E' },
      { code: 'KeyR', label: 'r', shiftLabel: 'R' },
      { code: 'KeyT', label: 't', shiftLabel: 'T' },
      { code: 'KeyY', label: 'y', shiftLabel: 'Y' },
      { code: 'KeyU', label: 'u', shiftLabel: 'U' },
      { code: 'KeyI', label: 'i', shiftLabel: 'I' },
      { code: 'KeyO', label: 'o', shiftLabel: 'O' },
      { code: 'KeyP', label: 'p', shiftLabel: 'P' },
      { code: 'BracketLeft', label: '[', shiftLabel: '{' },
      { code: 'BracketRight', label: ']', shiftLabel: '}' },
      { code: 'Backslash', label: '\\', shiftLabel: '|' },
    ],
    [
      { code: 'CapsLock', label: 'Caps', width: 'w-16', isSpecial: true },
      { code: 'KeyA', label: 'a', shiftLabel: 'A' },
      { code: 'KeyS', label: 's', shiftLabel: 'S' },
      { code: 'KeyD', label: 'd', shiftLabel: 'D' },
      { code: 'KeyF', label: 'f', shiftLabel: 'F' },
      { code: 'KeyG', label: 'g', shiftLabel: 'G' },
      { code: 'KeyH', label: 'h', shiftLabel: 'H' },
      { code: 'KeyJ', label: 'j', shiftLabel: 'J' },
      { code: 'KeyK', label: 'k', shiftLabel: 'K' },
      { code: 'KeyL', label: 'l', shiftLabel: 'L' },
      { code: 'Semicolon', label: ';', shiftLabel: ':' },
      { code: 'Quote', label: "'", shiftLabel: '"' },
      { code: 'Enter', label: 'Enter', width: 'w-20', isSpecial: true },
    ],
    [
      { code: 'ShiftLeft', label: 'Shift', width: 'w-24', isSpecial: true },
      { code: 'KeyZ', label: 'z', shiftLabel: 'Z' },
      { code: 'KeyX', label: 'x', shiftLabel: 'X' },
      { code: 'KeyC', label: 'c', shiftLabel: 'C' },
      { code: 'KeyV', label: 'v', shiftLabel: 'V' },
      { code: 'KeyB', label: 'b', shiftLabel: 'B' },
      { code: 'KeyN', label: 'n', shiftLabel: 'N' },
      { code: 'KeyM', label: 'm', shiftLabel: 'M' },
      { code: 'Comma', label: ',', shiftLabel: '<' },
      { code: 'Period', label: '.', shiftLabel: '>' },
      { code: 'Slash', label: '/', shiftLabel: '?' },
      { code: 'ShiftRight', label: 'Shift', width: 'w-24', isSpecial: true },
    ],
    [
      { code: 'Space', label: 'Space', width: 'w-80', isSpecial: true },
    ],
  ],
};

export const KHMER_NIDA_LAYOUT: KeyboardLayout = {
  id: 'khmer',
  name: 'Khmer NiDA Keyboard',
  rows: [
    [
      { code: 'Backquote', label: '«', shiftLabel: '»' },
      { code: 'Digit1', label: '១', shiftLabel: '!' },
      { code: 'Digit2', label: '២', shiftLabel: '២' },
      { code: 'Digit3', label: '៣', shiftLabel: '"' },
      { code: 'Digit4', label: '៤', shiftLabel: '$' },
      { code: 'Digit5', label: '៥', shiftLabel: '%' },
      { code: 'Digit6', label: '៦', shiftLabel: '៌' },
      { code: 'Digit7', label: '៧', shiftLabel: '៏' },
      { code: 'Digit8', label: '៨', shiftLabel: '័' },
      { code: 'Digit9', label: '៩', shiftLabel: '៎' },
      { code: 'Digit0', label: '០', shiftLabel: 'ឲ' },
      { code: 'Minus', label: 'ឥត', shiftLabel: 'ឱ' },
      { code: 'Equal', label: '=', shiftLabel: '៵' },
      { code: 'Backspace', label: 'Backspace', width: 'w-20', isSpecial: true },
    ],
    [
      { code: 'Tab', label: 'Tab', width: 'w-14', isSpecial: true },
      { code: 'KeyQ', label: 'ឆ', shiftLabel: 'ឈ' },
      { code: 'KeyW', label: 'ដ', shiftLabel: 'ឌ' },
      { code: 'KeyE', label: 'ដើ', shiftLabel: 'ែ' },
      { code: 'KeyR', label: 'រ', shiftLabel: 'ឫ' },
      { code: 'KeyT', label: 'ត', shiftLabel: 'ថ' },
      { code: 'KeyY', label: 'យ', shiftLabel: 'ួ' },
      { code: 'KeyU', label: 'ុ', shiftLabel: 'ូ' },
      { code: 'KeyI', label: 'ិ', shiftLabel: 'ី' },
      { code: 'KeyO', label: 'ោ', shiftLabel: 'ៅ' },
      { code: 'KeyP', label: 'ផ', shiftLabel: 'ភ' },
      { code: 'BracketLeft', label: 'ៀ', shiftLabel: 'ឿ' },
      { code: 'BracketRight', label: 'ឲ', shiftLabel: 'ឧ' },
      { code: 'Backslash', label: 'ឮ', shiftLabel: 'ឭ' },
    ],
    [
      { code: 'CapsLock', label: 'Caps', width: 'w-16', isSpecial: true },
      { code: 'KeyA', label: 'ា', shiftLabel: 'ាំ' },
      { code: 'KeyS', label: 'ស', shiftLabel: 'shared' },
      { code: 'KeyD', label: 'ដ', shiftLabel: 'ឌ' },
      { code: 'KeyF', label: 'ថ', shiftLabel: 'ធ' },
      { code: 'KeyG', label: 'ង', shiftLabel: 'អ' },
      { code: 'KeyH', label: 'ហ', shiftLabel: 'ះ' },
      { code: 'KeyJ', label: '្ (ជើង)', shiftLabel: 'ញ' },
      { code: 'KeyK', label: 'ក', shiftLabel: 'គ' },
      { code: 'KeyL', label: 'ល', shiftLabel: 'ឡ' },
      { code: 'Semicolon', label: 'ើ', shiftLabel: 'ះ' },
      { code: 'Quote', label: '់', shiftLabel: '៉' },
      { code: 'Enter', label: 'Enter', width: 'w-20', isSpecial: true },
    ],
    [
      { code: 'ShiftLeft', label: 'Shift', width: 'w-24', isSpecial: true },
      { code: 'KeyZ', label: 'ឋ', shiftLabel: 'ឍ' },
      { code: 'KeyX', label: 'ខ', shiftLabel: 'ឃ' },
      { code: 'KeyC', label: 'ច', shiftLabel: 'ជ' },
      { code: 'KeyV', label: 'វ', shiftLabel: 'េះ' },
      { code: 'KeyB', label: 'ប', shiftLabel: 'ព' },
      { code: 'KeyN', label: 'ន', shiftLabel: 'ណ' },
      { code: 'KeyM', label: 'ម', shiftLabel: 'ំ' },
      { code: 'Comma', label: 'ឡ', shiftLabel: '៖' },
      { code: 'Period', label: '៕', shiftLabel: '៹' },
      { code: 'Slash', label: '៊', shiftLabel: '?' },
      { code: 'ShiftRight', label: 'Shift', width: 'w-24', isSpecial: true },
    ],
    [
      { code: 'Space', label: 'Space', width: 'w-80', isSpecial: true },
    ],
  ],
};

export function getKhmerCharForCode(code: string, isShift: boolean = false): string | null {
  for (const row of KHMER_NIDA_LAYOUT.rows) {
    for (const key of row) {
      if (key.code === code && !key.isSpecial) {
        if (isShift && key.shiftLabel) return key.shiftLabel;
        if (key.label === '្ (ជើង)') return '្';
        return key.label;
      }
    }
  }
  return null;
}
