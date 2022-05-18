import { IBoardHexagon, IPlayer, TBoard } from '../../../shared/types';
// import { BOARD } from '../../../shared/constants';
import { cityLayoutProperties } from './cityLayoutProperties';
import { allowedMoves } from './moveIsAllowed';

interface IBoardLayoutElement extends IBoardHexagon {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  highlight?: boolean;
}

export type TBoardLayout = IBoardLayoutElement[];

export const createBoardLayout = (
  board: TBoard,
  myPlayer: IPlayer,
  canSail: boolean
): TBoardLayout => {
  const boardLayout: IBoardLayoutElement[] = [];

  const hexesToHighlight = allowedMoves(3, myPlayer.position, board);

  board.forEach((hexagon) => {
    let layoutElement: IBoardLayoutElement = hexagon;

    if (layoutElement.city) assignCityProperties(layoutElement);

    const findHex = hexesToHighlight.find(
      (htl) => htl.column === hexagon.column && htl.row === hexagon.row
    );

    if (findHex && canSail) {
      layoutElement.highlight = true;
    } else {
      layoutElement.highlight = false;
    }

    boardLayout.push(layoutElement);
  });

  console.log(boardLayout);

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
