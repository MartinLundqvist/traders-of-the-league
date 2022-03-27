import { TCity, TRegion } from '../types';

type TRegionCityMap = {
  [key in TRegion]: TCity[];
};

export const REGION_CITY_MAP: TRegionCityMap = {
  West: ['London', 'Newcastle', 'Brügge', 'Bergen', 'Hamburg'],
  Central: ['Tønsberg', 'Lübeck', 'Falsterbo', 'Stettin'],
  East: ['Reval', 'Stockholm', 'Visby', 'Danzig', 'Åbo', 'Riga'],
};
