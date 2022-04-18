import { useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, Input, Button } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;

interface IJoinGameProps {
  className: string;
}

const JoinGame = ({ className }: IJoinGameProps): JSX.Element => {
  const [gameUuid, setGameUuid] = useState('');
  const { joinGame } = useGameServer();
  // const [showGameCode, setShowGameCode] = useState(false);

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      joinGame(gameUuid);
    }
  };

  return (
    <Wrapper className={className}>
      <div className='container'>
        <Title>Paste the game ID</Title>
        <Input
          type='text'
          value={gameUuid}
          onChange={(e) => setGameUuid(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
          autoFocus
        />
        <Button onClick={() => joinGame(gameUuid)}>GO</Button>
      </div>
    </Wrapper>
  );
};

export default JoinGame;
