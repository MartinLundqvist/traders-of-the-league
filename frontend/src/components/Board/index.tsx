import styled from 'styled-components';
import Hex from './Hex';
import Ships from './Ships';
import { useMemo } from 'react';
import { IBoardPosition } from '../../../../shared/types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BOARD_TOP_BOTTOM_PADDING,
} from '../../utils/boardGeometry';
import { useLayout } from '../../contexts/LayoutProvider';
import { useGameServer } from '../../contexts/GameServerProvider';

const Wrapper = styled.div`
  position: relative;
  place-self: center;
  width: ${BOARD_WIDTH}px;
  height: ${BOARD_HEIGHT}px;
  margin-top: ${BOARD_TOP_BOTTOM_PADDING}px;
  margin-bottom: ${BOARD_TOP_BOTTOM_PADDING}px;
`;

interface IBoardProps {
  className: string;
}

const Board = ({ className }: IBoardProps): JSX.Element => {
  const { isMyTurn, sailTo } = useGameServer();
  const { boardLayout } = useLayout();

  const handleHexClick = (position: IBoardPosition) => {
    if (isMyTurn) {
      sailTo(position);
      return;
    }
    console.log('Not your turn!');
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
          onClick={() => handleHexClick({ column: hex.column, row: hex.row })}
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
