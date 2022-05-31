import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { Button, Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: var(--color-fill-sea-opaque);
  backdrop-filter: blur(10px);
  z-index: 10;

  .info {
    font-size: 1.7rem;
  }

  .buttons {
    display: flex;
    gap: 2rem;
  }
`;

interface IEndroundProps {
  className: string;
}

const Endround = ({ className }: IEndroundProps): JSX.Element => {
  const { endRound } = useGameServer();
  const { setActiveActionRoute } = useLayout();

  const handleEndroundClick = () => {
    endRound();
    setActiveActionRoute('none');
  };

  return (
    <Wrapper className={className}>
      <Title>You're out of moves, captain!</Title>
      <div className='info'>
        Do you end the round, or continue watching your ship drift (and annoy
        your fellow traders)?
      </div>
      <div className='buttons'>
        <Button onClick={() => handleEndroundClick()}>End Round</Button>
        <Button warning onClick={() => setActiveActionRoute('none')}>
          Annoy
        </Button>
      </div>
    </Wrapper>
  );
};

export default Endround;
