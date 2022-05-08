import styled from 'styled-components';
import compass from '../../../assets/compass.png';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 0.25rem;
  align-items: center;
  justify-content: center;
  background-image: url('${compass}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .row {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    /* backdrop-filter: blur(2px); */

    .region {
      font-size: 1.5rem;
    }
  }
`;

export const RegionalTraderA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div>5</div>
        <div>x</div>
        <div className='region'>C</div>
      </div>
    </Wrapper>
  );
};
