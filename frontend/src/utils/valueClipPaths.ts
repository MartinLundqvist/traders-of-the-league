import { TVictoryPoint } from '../../../shared/types';

type TClipPathArray = {
  [key in TVictoryPoint]: string;
};

export const valueClipPaths: TClipPathArray = {
  0: '',
  1: 'circle(50% at 50% 50%);',
  2: 'circle(50% at 50% 50%);',
  3: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
  4: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
  5: 'polygon(0 0, 100% 0, 100% 100%, 49% 80%, 0 100%);',
  6: 'polygon(0 0, 100% 0, 100% 100%, 49% 80%, 0 100%);',
  7: 'polygon(0 0, 100% 0, 100% 100%, 49% 80%, 0 100%);',
};
