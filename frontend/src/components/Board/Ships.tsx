import styled from 'styled-components';
import { IMAGES } from '../../elements/Images';
import { useLayout } from '../../contexts/LayoutProvider';
import { Ship } from './Ship';

const shipElements = {
  black: IMAGES.UI.SHIPS.ship_black,
  blue: IMAGES.UI.SHIPS.ship_blue,
  red: IMAGES.UI.SHIPS.ship_red,
  green: IMAGES.UI.SHIPS.ship_green,
  yellow: IMAGES.UI.SHIPS.ship_yellow,
};

const Isolate = styled.div`
  z-index: 4;
  isolation: isolate;

  div:nth-child(1) {
    z-index: 5;
  }
  div:nth-child(2) {
    z-index: 4;
  }
  div:nth-child(3) {
    z-index: 3;
  }
  div:nth-child(4) {
    z-index: 2;
  }
  div:nth-child(5) {
    z-index: 1;
  }
`;

const Ships = (): JSX.Element => {
  const { shipLayout } = useLayout();

  return (
    <Isolate>
      {shipLayout.map((ship) => (
        <Ship
          key={ship.player.user.uuid}
          ship_url={shipElements[ship.player.color]}
          row={ship.row}
          column={ship.column}
          offset={ship.offset}
        ></Ship>
      ))}
    </Isolate>
  );
};

export default Ships;
