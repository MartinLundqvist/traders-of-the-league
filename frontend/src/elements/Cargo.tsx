import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TCargo } from '../../../shared/types';
import Good from './Good';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

interface IPolygonProps {
  fill: string;
}

const Polygon = styled.polygon<IPolygonProps>`
  fill: ${(props) => props.fill};
`;

interface ICargoProps {
  cargo: TCargo[];
}

const Cargo = ({ cargo }: ICargoProps): JSX.Element => {
  const [color, setColor] = useState(['']);
  const [good, setGoods] = useState<JSX.Element[]>([]);

  return (
    <Wrapper>
      {cargo.map((good, index) => (
        <Good good={good} key={index} />
      ))}
    </Wrapper>
  );
};

export default Cargo;
