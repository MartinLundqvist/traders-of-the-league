import { IBoardHexagon } from '../../../shared/types';
import { BOARD } from '../../../shared/constants';
import { cityLayoutProperties } from './cityLayoutProperties';

interface IBoardLayoutElement extends IBoardHexagon {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

export type TBoardLayout = IBoardLayoutElement[];

export const createBoardLayout = (): TBoardLayout => {
  const boardLayout: IBoardLayoutElement[] = [];

  BOARD.forEach((hexagon) => {
    let layoutElement: IBoardLayoutElement = hexagon;

    if (layoutElement.city) assignCityProperties(layoutElement);

    boardLayout.push(layoutElement);
  });

  return boardLayout as TBoardLayout;
};

const assignCityProperties = (hexagon: IBoardLayoutElement) => {
  if (!hexagon.city) return;

  const property = cityLayoutProperties[hexagon.city?.name];
  if (property.center) hexagon.center = true;
  if (property.west) hexagon.west = true;
  if (property.farEast) hexagon.farEast = true;
  if (property.north) hexagon.north = true;
  hexagon.city.coatOfArms = property.coatOfArms;
};
