import styled from 'styled-components';
import Hex from './Hex';
import Ships from './Ships';
import { useMemo } from 'react';
import { IBoardPosition } from '../../../../shared/types';
import {
  HEX_MIN_DIAMETER,
  HEX_LEFT_OFFSET,
  HEX_SIDE_LENGTH,
} from '../../utils/boardGeometry';
import { useGame } from '../../contexts/GameProvider';

const Wrapper = styled.div`
  position: relative;
  place-self: center;
  width: ${12 * HEX_LEFT_OFFSET + HEX_SIDE_LENGTH / 2}px;
  height: ${5 * HEX_MIN_DIAMETER}px;
`;

interface IBoardProps {
  className: string;
}

const Board = ({ className }: IBoardProps): JSX.Element => {
  const { movePlayerUUIDTo, myPlayerUUID, boardLayout, dealContracts } =
    useGame();

  const movePlayerTo = ({ column, row }: IBoardPosition) => {
    movePlayerUUIDTo(myPlayerUUID, { column, row });
  };

  const Hexagons = useMemo(
    () =>
      boardLayout.map((hex, index) => (
        <Hex
          id={index}
          row={hex.row}
          column={hex.column}
          city={hex.city}
          key={index}
          north={hex.north}
          west={hex.west}
          center={hex.center}
          farEast={hex.farEast}
          onClick={() => movePlayerTo({ column: hex.column, row: hex.row })}
        />
      )),

    [boardLayout]
  );

  return (
    <Wrapper className={className}>
      {Hexagons}
      <Ships />
    </Wrapper>
  );
};

export default Board;
