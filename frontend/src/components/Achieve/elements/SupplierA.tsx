import styled from 'styled-components';
import city from '../../../assets/city.svg';

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

    .city {
      height: 100%;
      width: 100%;
      background-image: url('${city}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

export const SupplierA = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='row'>
        <div className='city'></div>
        <div className='city'></div>
      </div>
      <div className='row'>
        <div className='city'></div>
      </div>
    </Wrapper>
  );
};
