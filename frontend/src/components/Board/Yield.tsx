import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import flag from '../../assets/whiteflag.png';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: column;
  bottom: 1rem;
  left: 0;

  img {
    height: 4rem;
    transform-origin: bottom center;
    cursor: pointer;

    &:hover {
      animation: whiggle 0.5s linear alternate infinite;
    }
  }

  @keyframes whiggle {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(15deg);
    }
  }
`;

const Yield = (): JSX.Element => {
  const { yieldGame } = useGameServer();

  return (
    <Wrapper>
      <img src={flag} onClick={() => yieldGame()} />
    </Wrapper>
  );
};

export default Yield;
