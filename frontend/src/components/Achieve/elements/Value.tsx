import styled from 'styled-components';
import { TVictoryPoint } from '../../../../../shared/types';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;

  svg {
    height: 100%;
    width: 100%;
  }

  .value {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    padding-bottom: 0.25rem;
    height: 100%;
    width: 100%;
  }
`;

interface IValueProps {
  value: TVictoryPoint;
}

export const Value = ({ value }: IValueProps): JSX.Element => {
  return (
    <Wrapper>
      <div className='value'>{value}</div>
      <svg
        viewBox='0 0 100 150'
        xmlns='http://www.w3.org/2000/svg'
        stroke='black'
        fill='white'
        strokeWidth='5'
      >
        <polygon points='0 0, 100 0, 100 150, 49 120, 0 150'></polygon>
      </svg>
    </Wrapper>
  );
};
