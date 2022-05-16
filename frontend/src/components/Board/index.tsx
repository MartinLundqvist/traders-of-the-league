import styled from 'styled-components';
import Hex from './Hex';
import Ships from './Ships';
import { useMemo } from 'react';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BOARD_TOP_BOTTOM_PADDING,
} from '../../utils/boardGeometry';
import { useLayout } from '../../contexts/LayoutProvider';
import { useGameServer } from '../../contexts/GameServerProvider';
import Achievements from './Achievements';

const Wrapper = styled.div`
  // New version
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .hexagons {
    position: relative;
    width: ${BOARD_WIDTH}px;
    height: ${BOARD_HEIGHT}px;
    /* margin-top: ${BOARD_TOP_BOTTOM_PADDING}px;
    margin-bottom: ${BOARD_TOP_BOTTOM_PADDING}px; */
  }
`;

interface IBoardProps {
  className: string;
}

const Board = ({ className }: IBoardProps): JSX.Element => {
  const { sailTo } = useGameServer();
  const { boardLayout } = useLayout();

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
          // onClick={() => {
          //   console.log(JSON.stringify({ column: hex.column, row: hex.row }));
          // }}
          onClick={() => sailTo({ column: hex.column, row: hex.row })}
        />
      )),

    [boardLayout]
  );

  return (
    <Wrapper className={className}>
      <div className='hexagons'>
        {Hexagons}
        <Ships />
      </div>

      <Achievements />
    </Wrapper>
  );
};

export default Board;
