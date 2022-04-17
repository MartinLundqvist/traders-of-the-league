import { TCity } from '../../../shared/types';
import newcastle from '../assets/newcastle.png';
import abo from '../assets/abo.png';
import bergen from '../assets/bergen.png';
import brugge from '../assets/brugge.png';
import danzig from '../assets/danzig.png';
import falsterbo from '../assets/falsterbo.png';
import hamburg from '../assets/hamburg.png';
import london from '../assets/london.png';
import lubeck from '../assets/lubeck.png';
import reval from '../assets/reval.png';
import riga from '../assets/riga.png';
import stettin from '../assets/stettin.png';
import stockholm from '../assets/stockholm.png';
import tonsberg from '../assets/tonsberg.png';
import visby from '../assets/visby.png';

export interface ICityLayoutProperty {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  coatOfArms: string;
}

type ICityLayoutPropertyMap = {
  [key in TCity]: ICityLayoutProperty;
};

export const cityLayoutProperties: ICityLayoutPropertyMap = {
  Newcastle: {
    north: true,
    coatOfArms: newcastle,
  },
  London: {
    coatOfArms: london,
  },
  Brügge: {
    west: true,
    coatOfArms: brugge,
  },
  Bergen: {
    north: true,
    coatOfArms: bergen,
  },
  Hamburg: {
    west: true,
    coatOfArms: hamburg,
  },
  Tønsberg: {
    north: true,
    coatOfArms: tonsberg,
  },
  Lübeck: {
    coatOfArms: lubeck,
  },
  Falsterbo: {
    north: true,
    center: true,
    coatOfArms: falsterbo,
  },
  Stettin: {
    coatOfArms: stettin,
  },
  Stockholm: {
    north: true,
    coatOfArms: stockholm,
  },
  Visby: {
    farEast: true,
    north: true,
    coatOfArms: visby,
  },
  Danzig: {
    west: true,
    coatOfArms: danzig,
  },
  Åbo: {
    north: true,
    coatOfArms: abo,
  },
  Riga: {
    west: true,
    coatOfArms: riga,
  },
  Reval: {
    north: true,
    coatOfArms: reval,
  },
};
