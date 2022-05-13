import styled from 'styled-components';

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

    .contract {
      height: 1.5rem;
      width: 1.5rem;
      text-align: center;
      border-radius: 50%;
      border: 1px solid black;
      background-color: white;
    }
  }
`;

export const BankerA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div>4</div>
        <div>x</div>
        <div className='contract'>3</div>
      </div>
    </Wrapper>
  );
};
