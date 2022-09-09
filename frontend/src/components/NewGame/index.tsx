import { useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import Scroll from '../../elements/Scroll';
import { Title, Input, Button } from '../../elements/Typography';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;

//   .container {
//     display: flex;
//     flex-direction: row;
//     gap: 1rem;
//   }

//   span.code {
//     font-family: 'Roboto';
//     font-size: 0.9em;
//   }
// `;

interface INewGameProps {
  className: string;
}

const NewGame = ({ className }: INewGameProps): JSX.Element => {
  const [gameName, setGameName] = useState('');
  const { createAndJoinNewGame } = useGameServer();

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      createAndJoinNewGame(gameName);
    }
  };

  return (
    <Scroll className={className}>
      <Title>Pick a name for your game</Title>
      <Input
        type='text'
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        autoFocus
      />
      <Button onClick={() => createAndJoinNewGame(gameName)}>GO</Button>
    </Scroll>
  );
};

export default NewGame;
