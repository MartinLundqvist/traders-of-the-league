import styled from 'styled-components';
import Hex from './Hex';
import Ships from './Ships';
import { useMemo } from 'react';
import { useLayout } from '../../contexts/LayoutProvider';
import { useGameServer } from '../../contexts/GameServerProvider';
import { IBoardLayoutElement } from '../../utils/createBoardLayout';

const Wrapper = styled.div`
  // New version
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .hexagons {
    isolation: isolate;
    position: relative;
    z-index: 1;
    display: grid;
    place-content: center;
    grid-template-columns: repeat(12, var(--width));
    grid-template-rows: repeat(10, var(--height));
  }
`;

interface IBoardProps {
  className: string;
}

const Board = ({ className }: IBoardProps): JSX.Element => {
  const { sailTo, myPlayer, isInCity, isMyTurn } = useGameServer();
  const { boardLayout, setActiveActionRoute } = useLayout();

  const handleHexClick = (hex: IBoardLayoutElement) => {
    if (
      hex.column === myPlayer?.position.column &&
      hex.row === myPlayer?.position.row
    ) {
      console.log('That is where you are!');

      if (isInCity && isMyTurn) setActiveActionRoute('city');
    } else {
      sailTo(hex);
    }
  };

  const createHexId = (hex: IBoardLayoutElement): string => {
    return hex.column.toString() + ':' + hex.row.toString();
  };

  const Hexagons = useMemo(
    () =>
      boardLayout.map((hex, index) => (
        <Hex
          id={createHexId(hex)}
          row={hex.row}
          column={hex.column}
          city={hex.city}
          key={index}
          north={hex.north}
          west={hex.west}
          center={hex.center}
          farEast={hex.farEast}
          highlight={hex.highlight}
          onClick={() => handleHexClick(hex)}
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
    </Wrapper>
  );
};

export default Board;
