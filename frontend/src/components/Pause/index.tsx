import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: var(--color-fill-sea-opaque);
  backdrop-filter: blur(10px);
  z-index: 10;
`;

interface IWaitProps {
  className: string;
}

const Pause = ({ className }: IWaitProps): JSX.Element => {
  const { currentPlayer } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>WAIT</Title>
    </Wrapper>
  );
};

export default Pause;
