// import ship from '../../assets/ship.svg';
import styled from 'styled-components';
import ship_black from '../../assets/ships/Ship_black.png';
import ship_blue from '../../assets/ships/Ship_blue.png';
import ship_red from '../../assets/ships/Ship_red.png';
import ship_green from '../../assets/ships/Ship_green.png';
import ship_yellow from '../../assets/ships/Ship_yellow.png';
import { useLayout } from '../../contexts/LayoutProvider';
import { SHIP_HEIGHT, SHIP_WIDTH } from '../../utils/shipGeometry';
import Good from './Good';
import { useEffect, useState } from 'react';

const shipElements = {
  black: ship_black,
  blue: ship_blue,
  red: ship_red,
  green: ship_green,
  yellow: ship_yellow,
};

interface IWrapperProps {
  top: number;
  left: number;
  ship_url: string;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: calc(${(props) => props.top}px + 10px);
  left: ${(props) => props.left + 20}px;
  height: ${SHIP_HEIGHT}px;
  width: ${SHIP_WIDTH}px;
  background-image: ${(props) => `url('${props.ship_url}')`};
  background-size: cover;
  background-position: center;
  pointer-events: none;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));

  transition: all 350ms ease-in-out;
  z-index: 4;
`;

const Ships = (): JSX.Element => {
  const { shipLayout } = useLayout();

  return (
    <>
      {shipLayout.map((ship) => (
        <Wrapper
          top={ship.top}
          left={ship.left}
          key={ship.player.user.uuid}
          ship_url={shipElements[ship.player.color]}
        ></Wrapper>
      ))}
    </>
  );
};

export default Ships;
