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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  getLeftForBoardPosition,
  getTopForBoardPosition,
} from '../../utils/boardGeometry';

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

interface IWrapperProps {
  top: number;
  left: number;
  ship_url: string;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: calc(${(props) => props.top}px + var(--R) / 2);
  left: calc(${(props) => props.left}px + var(--R) / 3);

  /* height: ${SHIP_HEIGHT}px;
  width: ${SHIP_WIDTH}px; */
  height: var(--R);
  width: var(--R);
  background-image: ${(props) => `url('${props.ship_url}')`};
  background-size: cover;
  background-position: center;
  pointer-events: none;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));

  transition: all 350ms ease-in-out;
  /* z-index: 4; */
`;

const Ships = (): JSX.Element => {
  const { shipLayout } = useLayout();

  // const getShipRect = (ship: any) => {
  //   const dataId = ship.column.toString() + ':' + ship.row.toString();
  //   const hexElem = document.getElementById(dataId);

  //   if (!hexElem) return { top: 0, left: 0 };

  //   console.log(hexElem);

  //   return {
  //     top: hexElem.offsetTop,
  //     left: hexElem.offsetLeft,
  //   };
  // };

  // useLayoutEffect(() => {
  //   shipLayout.forEach((ship) => {
  //     const dataId = ship.column.toString() + ':' + ship.row.toString();
  //     const hexElem = document.getElementById(dataId);

  //     const rect = hexElem?.getBoundingClientRect();

  //     console.log(rect);
  //   });
  // }, [shipLayout]);

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

interface IShipProps {
  row: number;
  column: number;
  ship_url: string;
  offset: number;
}

const Ship = ({ row, column, offset, ship_url }: IShipProps): JSX.Element => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const [rerenderToggle, setRerenderToggle] = useState(false);

  // We have to use the resize observer on the container of the ships, since it is the parent element to the ships that will resize
  useEffect(() => {
    if (!ref.current) return;

    let resizeObserver: ResizeObserver | null = new ResizeObserver(
      (entries) => {
        if (!Array.isArray(entries)) return;
        // This forces the container to rerender, which then of course rerenders each of the ships.
        setRerenderToggle((_prevState) => !_prevState);
        // console.log('New size of a ship!');
      }
    );

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver?.disconnect();
      resizeObserver = null;
    };
  }, []);

  // UseLayout effect triggers after the components have been mounted so that the geometry of the Hexes can be retrieved
  useLayoutEffect(() => {
    const dataId = column.toString() + ':' + row.toString();
    const hexElem = document.getElementById(dataId);
    // console.log('In UseLayoutEffect in Ship');
    // console.log(hexElem);

    setTop(hexElem ? hexElem.offsetTop - offset : 0);
    setLeft(hexElem ? hexElem.offsetLeft + offset : 0);

    // console.log(
    //   'This ships left position is ' +
    //     (ref.current ? ref.current.offsetLeft : 0)
    // );
    // console.log(
    //   'And the current hex left position is ' +
    //     (hexElem ? hexElem.offsetLeft : 0)
    // );
  });

  return (
    <Wrapper ref={ref} top={top} left={left} ship_url={ship_url}></Wrapper>
  );
};

export default Ships;
