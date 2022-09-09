import styled from 'styled-components';
import { ICity } from '../../../../shared/types';
import {
  getLeftForBoardPosition,
  getTopForBoardPosition,
  HEX_MAX_DIAMETER,
  HEX_MIN_DIAMETER,
} from '../../utils/boardGeometry';
import Cargo from './Cargo';
import Contracts from './Contracts';

import hex_sea from '../../assets/map/hex_tile_sea.png';
import hex_city_center from '../../assets/map/hex_tile_city_center.png';
import hex_city_west from '../../assets/map/hex_tile_city_west.png';
import hex_city_east from '../../assets/map/hex_tile_city_east.png';

interface IWrapperProps {
  top: number;
  left: number;
  hex_url: string;
  north?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  background-image: ${(props) => `url('${props.hex_url}')`};
  background-size: cover;
  background-position: center;
  position: absolute;
  height: ${HEX_MIN_DIAMETER}px;
  width: ${HEX_MAX_DIAMETER}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;

  &.highlight {
    /* filter: contrast(150%); */
  }

  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }

  // This is in order to make sure the Polygon restricts the pointer event surface!
  pointer-events: none;

  span.city {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: center;
    /* ${(props) => props.north && 'align-items: flex-start;'}; */
    display: flex;
    justify-content: center;
    font-size: 1rem;
    /* text-transform: uppercase; */
    /* color: var(--color-hex); */
    color: black;
    /* font-weight: bold; */
    pointer-events: none;
    z-index: 2;
  }

  img.coa {
    position: absolute;
    border-radius: 50%;
    bottom: 5px;
    ${(props) => props.north && 'top: 5px;'};
    left: 5px;
    width: 25px;
    height: 25px;
    object-fit: cover;
    border: 1px solid var(--color-hex);
    background-color: var(--color-fill);
    z-index: 2;
  }
`;

interface ISVGProps {
  city?: null | ICity;
}

const SVG = styled.svg<ISVGProps>`
  /* opacity: 1; */
  /* fill: var(--color-fill-sea); */
  fill: transparent;

  /* ${(props) => props.city && 'fill: var(--color-fill);'} */

  &.highlight {
    /* filter: drop-shadow(0 0 15px var(--color-bg-shadow)); */
    /* filter: drop-shadow(0 0 15px white); */
  }

  // This still works since events "bubble up" from the Polygon to the parent
  &:hover {
    /* opacity: 1; */
    /* filter: grayscale(80%); */
  }
`;

const Polygon = styled.polygon`
  /* stroke: var(--color-hex); */
  /* stroke-width: 10;
  stroke-miterlimit: 10; */

  &.highlight {
    /* animation: stroke 1000ms infinite; */
    /* stroke: var(--color-hex-highlight); */
    /* stroke: white; */

    stroke: var(--color-hex-highlight);
    stroke-width: 10;
    stroke-miterlimit: 10;
  }

  /* @keyframes stroke {
    0% {
      stroke: var(--color-hex);
      stroke-width: 10;
    }
    50% {
      stroke: var(--color-hex-highlight);
      stroke-width: 10;
    }
    100% {
      stroke: var(--color-hex);
      stroke-width: 10;
    } 
  } */

  // This is where we want the pointer events to happen!
  pointer-events: auto;
`;

interface IHexProps {
  id: number;
  row: number;
  column: number;
  city?: null | ICity;
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  highlight?: boolean;
  onClick: () => void;
}

const Hex = ({
  id,
  city = null,
  row,
  column,
  north,
  west,
  center,
  farEast,
  onClick,
  highlight,
}: IHexProps): JSX.Element => {
  const getImageUrl = (city: ICity | null): string => {
    let result = hex_sea;

    if (city) {
      switch (city.region) {
        case 'Central':
          result = hex_city_center;
          break;
        case 'East':
          result = hex_city_east;
          break;
        case 'West':
          result = hex_city_west;
          break;
      }
    }

    return result;
  };

  return (
    <Wrapper
      data-id={id}
      top={getTopForBoardPosition({ row, column })}
      left={getLeftForBoardPosition({ row, column })}
      north={north}
      hex_url={getImageUrl(city)}
      className={highlight ? 'highlight' : ''}
      // onClick={onClick}
    >
      <SVG
        city={city}
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        viewBox='0 0 511.544 443.01'
        className={highlight ? 'highlight' : ''}
      >
        <Polygon
          points='130.773,438.01 5.774,221.505 130.773,5 380.771,5 505.771,221.505 380.771,438.01 '
          onClick={onClick}
          className={highlight ? 'highlight' : ''}
        />
      </SVG>
      {city && (
        <>
          <span className='city'>{city.name}</span>
          {/* <img className='coa' src={city.coatOfArms} /> */}
          <Cargo cargo={city.goods} />
          <Contracts
            contracts={city.contracts}
            north={north}
            west={west}
            center={center}
            farEast={farEast}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Hex;
