import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';
import Good from './Good';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'left right';

  div:nth-child(1) {
    grid-area: left;
    justify-self: end;
    align-self: center;
  }

  div:nth-child(2) {
    grid-area: right;
    justify-self: start;
    align-self: center;
  }

  /* justify-content: center; */
  align-items: center;
  top: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

interface ICargoProps {
  cargo: TCargo[];
}

const Cargo = ({ cargo }: ICargoProps): JSX.Element => {
  return (
    <Wrapper>
      {cargo.map((good, index) => (
        <Good good={good} key={index} />
      ))}
    </Wrapper>
  );
};

export default Cargo;
