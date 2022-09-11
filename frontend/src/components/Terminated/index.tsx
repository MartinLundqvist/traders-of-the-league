import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import ScrollFull from '../../elements/ScrollFull';
import { ButtonSmall, Title } from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

interface IStartProps {
  className: string;
}

const Terminated = ({ className }: IStartProps): JSX.Element => {
  const { leaveGame } = useGameServer();

  return (
    <ScrollFull className={className}>
      <Container>
        <Title>GAME TERMINATED</Title>
        <ButtonSmall onClick={() => leaveGame()}>Start over</ButtonSmall>
      </Container>
    </ScrollFull>
  );
};

export default Terminated;
