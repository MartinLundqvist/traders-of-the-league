import styled from 'styled-components';
import { ICity } from '../../../../shared/types';
import Cargo from './Cargo';
import Contracts from './Contracts';

interface IWrapperProps {
  top: string;
  left: string;
  width: string;
  height: string;
  north?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  span {
    position: absolute;
    height: 100%;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: flex-end;
    ${(props) => props.north && 'align-items: flex-start;'};
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: var(--color-hex);
    font-weight: bold;
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
  opacity: 0.7;
  fill: var(--color-fill-sea);

  ${(props) => props.city && 'fill: var(--color-fill);'}

  &:hover {
    opacity: 1;
  }
`;

const Polygon = styled.polygon`
  stroke: var(--color-hex);
  stroke-width: 10;
  stroke-miterlimit: 10;
`;

interface IHexProps {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  city?: null | ICity;
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

const Hex = ({
  id,
  city = null,
  top,
  left,
  width,
  height,
  north,
  west,
  center,
  farEast,
}: IHexProps): JSX.Element => {
  return (
    <Wrapper
      data-id={id}
      top={top}
      left={left}
      width={width}
      height={height}
      north={north}
    >
      {city && <span>{city.name}</span>}
      {city && <img className='coa' src={city.coatOfArms} />}
      <SVG
        city={city}
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        viewBox='0 0 511.544 443.01'
      >
        <Polygon points='130.773,438.01 5.774,221.505 130.773,5   380.771,5 505.771,221.505 380.771,438.01 ' />
      </SVG>
      {city && <Cargo cargo={city.goods} />}
      {city && (
        <Contracts
          contracts={city.contracts}
          north={north}
          west={west}
          center={center}
          farEast={farEast}
        />
      )}
    </Wrapper>
  );
};

export default Hex;
