import styled from 'styled-components';
import ship_black from '../../assets/ships/Ship_black.png';
import ship_blue from '../../assets/ships/Ship_blue.png';
import ship_red from '../../assets/ships/Ship_red.png';
import ship_green from '../../assets/ships/Ship_green.png';
import ship_yellow from '../../assets/ships/Ship_yellow.png';
import { useLayout } from '../../contexts/LayoutProvider';
import { Ship } from './Ship';

const shipElements = {
  black: ship_black,
  blue: ship_blue,
  red: ship_red,
  green: ship_green,
  yellow: ship_yellow,
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
