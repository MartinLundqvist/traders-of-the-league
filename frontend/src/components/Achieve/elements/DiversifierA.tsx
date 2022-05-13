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

    &:nth-child(1) {
      > div:nth-child(1) {
        transform: translateY(30%);
      }
      > div:nth-child(4) {
        transform: translateY(30%);
      }
    }

    .contract {
      > div:first-child {
        border-right: none;
      }
    }
  }
`;

export const DiversifierA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div className='contract'>
          <ColoredDiv color='black' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='red' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='blue' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='yellow' />
          <EmptyDiv />
        </div>
      </div>
      <div className='row'>
        <div className='contract'>
          <ColoredDiv color='gray' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='brown' />
          <EmptyDiv />
        </div>
        <div className='contract'>
          <ColoredDiv color='green' />
          <EmptyDiv />
        </div>
      </div>
    </Wrapper>
  );
};
