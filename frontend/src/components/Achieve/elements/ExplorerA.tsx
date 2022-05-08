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

  .row {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    /* backdrop-filter: blur(2px); */

    .region {
      height: 100%;
      width: 100%;
      font-size: 1rem;
      text-align: center;
    }

    .compass {
      height: 100%;
      width: 100%;
      background-image: url('${compass}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

export const ExplorerA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div className='region'>W</div>
        <div className='region'>C</div>
        <div className='region'>E</div>
      </div>
      <div className='row'>
        <div className='compass'></div>
        <div className='compass'></div>
        <div className='compass'></div>
      </div>
      <div className='row'>
        <div className='compass'></div>
        <div className='compass'></div>
        <div className='compass'></div>
      </div>
    </Wrapper>
  );
};
