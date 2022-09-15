import styled from 'styled-components';
import { ICity } from '../../../../shared/types';
import Cargo from './Cargo';
import Contracts from './Contracts';
import hex_sea from '../../assets/map/hex_tile_sea.png';
import hex_city_center from '../../assets/map/hex_tile_city_center.png';
import hex_city_west from '../../assets/map/hex_tile_city_west.png';
import hex_city_east from '../../assets/map/hex_tile_city_east.png';

interface IWrapperProps {
  row: number; // New for responsive
  column: number; // New for responsive
  hex_url: string;
  north?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  background-image: ${(props) => `url('${props.hex_url}')`};
  background-size: cover;
  background-position: center;

  // The below is new for responsive only
  position: relative;
  grid-row-start: ${(props) => props.row + 1};
  grid-column-start: ${(props) => props.column + 1};
  grid-row-end: span 2;
  width: calc(2 * var(--R));

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
    display: flex;
    justify-content: center;
    font-size: 1rem;
    color: black;
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
  fill: transparent;
`;

const Polygon = styled.polygon`
  stroke: grey;
  stroke-width: 2;
  stroke-miterlimit: 2;

  &.highlight {
    stroke: var(--color-hex-highlight);
    stroke-width: 10;
    stroke-miterlimit: 10;
  }

  // This is where we want the pointer events to happen!
  pointer-events: auto;
`;

interface IHexProps {
  id: string;
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
      id={id}
      north={north}
      column={column}
      row={row}
      hex_url={getImageUrl(city)}
      className={highlight ? 'highlight' : ''}
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
