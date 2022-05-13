import styled from 'styled-components';
import { ColoredDiv, EmptyDiv } from './ContractDivs';

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
    align-items: flex-start;
    justify-content: space-evenly;

    > div {
      display: inline-block;
      position: relative;
      height: 1.25rem;
      width: 1rem;
    }

    .contract {
      > div:first-child {
        border-right: none;
      }
    }
  }
`;

export const DiversifierB = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div className='contract'>
          <ColoredDiv color='red' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='yellow' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='gray' />
          <EmptyDiv />
        </div>
      </div>
      <div className='row'>
        <div className='contract'>
          <ColoredDiv color='red' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='yellow' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='gray' />
          <EmptyDiv />
        </div>
      </div>
    </Wrapper>
  );
};
