import styled from 'styled-components';
import { AnyDiv, ColoredDiv, EmptyDiv } from '.';

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

export const MonopolistA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div>7</div>
        <div>x</div>
        <div className='contract'>
          <EmptyDiv />
          <AnyDiv />
        </div>
      </div>
    </Wrapper>
  );
};
