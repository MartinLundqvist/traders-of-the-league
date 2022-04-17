import { TCargo } from '../../../shared/types';

type TGoodColor = {
  [key in TCargo]: string[];
};

export const CARGO_COLOR_STRINGS: TGoodColor = {
  black: ['hsl(255, 00%, 12%);', 'hsl(255,00%, 6%);', 'hsl(255, 00%, 0%);'],
  red: ['hsl(0, 70%, 72%);', 'hsl(0,70%, 66%);', 'hsl(0, 70%, 59%);'],
  blue: [
    'hsl(240, 100%, 72%);',
    'hsl(240, 100%, 66%);',
    'hsl(240, 100%, 59%);',
  ],
  yellow: ['hsl(60, 70%, 72%);', 'hsl(60,70%, 66%);', 'hsl(60, 70%, 59%);'],
  gray: ['hsl(60, 0%, 72%);', 'hsl(60,0%, 66%);', 'hsl(60, 0%, 59%);'],
  brown: ['hsl(27, 79%, 35%);', 'hsl(27,79%, 29%);', 'hsl(27, 79%, 23%);'],
  green: ['hsl(110, 70%, 72%);', 'hsl(110,70%, 66%);', 'hsl(110, 70%, 59%);'],
};
