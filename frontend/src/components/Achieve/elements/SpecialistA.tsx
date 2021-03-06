import styled from 'styled-components';
import { AnyDiv, ColoredDiv, EmptyDiv } from './ContractDivs';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 0.25rem;
  align-items: center;
  justify-content: center;

  .row {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    > div.contract {
      display: inline-block;
      position: relative;
      height: 1.25rem;
      width: 1rem;

      > div:first-child {
        border-right: none;
      }
    }
  }
`;

export const SpecialistA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div>4</div>
        <div>x</div>
        <div className='contract'>
          <EmptyDiv />
          <ColoredDiv color='blue' />
        </div>
      </div>
    </Wrapper>
  );
};
