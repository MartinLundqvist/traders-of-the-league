import { useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import Scroll from '../../elements/Scroll';
import ScrollFull from '../../elements/ScrollFull';
import { Title, Input, Button, ButtonSmall } from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;

interface INewGameProps {
  className: string;
}

const NewGame = ({ className }: INewGameProps): JSX.Element => {
  const [gameName, setGameName] = useState('');
  const { createAndJoinNewGame } = useGameServer();
  const { setActiveRoute } = useLayout();

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      createAndJoinNewGame(gameName);
    }
  };

  return (
    <ScrollFull className={className}>
      <Container>
        <Title>Pick a name for your game</Title>
        <Input
          type='text'
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
          autoFocus
        />
        <div className='buttons'>
          <ButtonSmall warning onClick={() => setActiveRoute('start')}>
            Back
          </ButtonSmall>
          <ButtonSmall onClick={() => createAndJoinNewGame(gameName)}>
            Create
          </ButtonSmall>
        </div>
      </Container>
    </ScrollFull>
  );
};

export default NewGame;
