// import ship from '../../assets/ship.svg';
import styled from 'styled-components';
import ship from '../../assets/ship2.png';
import { useLayout } from '../../contexts/LayoutProvider';
import { SHIP_HEIGHT, SHIP_WIDTH } from '../../utils/shipGeometry';
import Good from './Good';

interface IWrapperProps {
  top: number;
  left: number;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
  height: ${SHIP_HEIGHT}px;
  width: ${SHIP_WIDTH}px;
  background-image: url('${ship}');
  background-size: cover;
  background-position: center;
  transform: rotateZ(-30deg);

  transition: all 350ms ease-in-out;

  /* background-color: gray;
  border-radius: 50% 50% 10% 10%;
  border: 3px solid black; */
  z-index: 4;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 1fr 1fr 1fr 1fr 1fr 20px;

  div:nth-child(1) {
    grid-row: 2 / 3;
  }
  div:nth-child(2) {
    grid-row: 3 / 4;
  }
  div:nth-child(3) {
    grid-row: 4 / 5;
  }
  div:nth-child(4) {
    grid-row: 5 / 6;
  }
  div:nth-child(5) {
    grid-row: 6 / 7;
  }
`;

const Ships = (): JSX.Element => {
  const { shipLayout } = useLayout();

  return (
    <>
      {shipLayout.map((ship) => (
        <Wrapper top={ship.top} left={ship.left} key={ship.player.user.uuid}>
          {ship.player.cargo.map((good, index) => (
            <Good good={good} key={ship.player.user.uuid + index} />
          ))}
        </Wrapper>
      ))}
    </>
  );
};

export default Ships;
