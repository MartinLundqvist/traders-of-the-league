import { TCity } from '../../../shared/types';
// import newcastle from '../assets/newcastle.png';
// import abo from '../assets/abo.png';
// import bergen from '../assets/bergen.png';
// import brugge from '../assets/brugge.png';
// import danzig from '../assets/danzig.png';
// import falsterbo from '../assets/falsterbo.png';
// import hamburg from '../assets/hamburg.png';
// import london from '../assets/london.png';
// import lubeck from '../assets/lubeck.png';
// import reval from '../assets/reval.png';
// import riga from '../assets/riga.png';
// import stettin from '../assets/stettin.png';
// import stockholm from '../assets/stockholm.png';
// import tonsberg from '../assets/tonsberg.png';
// import visby from '../assets/visby.png';

// TODO: Once decided, we can remove the Coat of Arms completely

const urlFake = 'fake';

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
    coatOfArms: urlFake,
  },
  London: {
    coatOfArms: urlFake,
  },
  Brügge: {
    west: true,
    coatOfArms: urlFake,
  },
  Bergen: {
    north: true,
    coatOfArms: urlFake,
  },
  Hamburg: {
    west: true,
    coatOfArms: urlFake,
  },
  Tønsberg: {
    north: true,
    coatOfArms: urlFake,
  },
  Lübeck: {
    coatOfArms: urlFake,
  },
  Falsterbo: {
    north: true,
    center: true,
    coatOfArms: urlFake,
  },
  Stettin: {
    coatOfArms: urlFake,
  },
  Stockholm: {
    north: true,
    coatOfArms: urlFake,
  },
  Visby: {
    farEast: true,
    north: true,
    coatOfArms: urlFake,
  },
  Danzig: {
    west: true,
    coatOfArms: urlFake,
  },
  Åbo: {
    north: true,
    coatOfArms: urlFake,
  },
  Riga: {
    west: true,
    coatOfArms: urlFake,
  },
  Reval: {
    north: true,
    coatOfArms: urlFake,
  },
};
