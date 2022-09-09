import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';
import Good from './Good';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'left right';

  img:nth-child(1) {
    grid-area: left;
    padding-left: 50%;
  }

  img:nth-child(2) {
    grid-area: right;
    padding-right: 50%;
  }

  /* justify-content: center; */
  align-items: end;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 0 1rem 1rem 1rem;
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
