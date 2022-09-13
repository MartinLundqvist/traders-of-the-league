import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface IWrapperProps {
  top: number;
  left: number;
  ship_url: string;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: calc(${(props) => props.top}px + var(--R) / 2);
  left: calc(${(props) => props.left}px + var(--R) / 3);

  height: var(--R);
  width: var(--R);
  background-image: ${(props) => `url('${props.ship_url}')`};
  background-size: cover;
  background-position: center;
  pointer-events: none;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));

  transition: all 350ms ease-in-out;
`;

interface IShipProps {
  row: number;
  column: number;
  ship_url: string;
  offset: number;
}
export const Ship = ({
  row,
  column,
  offset,
  ship_url,
}: IShipProps): JSX.Element => {
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

    setTop(hexElem ? hexElem.offsetTop - offset : 0);
    setLeft(hexElem ? hexElem.offsetLeft + offset : 0);
  });

  return (
    <Wrapper ref={ref} top={top} left={left} ship_url={ship_url}></Wrapper>
  );
};
