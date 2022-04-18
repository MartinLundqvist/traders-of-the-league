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

  span.code {
    font-family: 'Roboto';
    font-size: 0.9em;
  }
`;

interface INewGameProps {
  className: string;
}

const NewGame = ({ className }: INewGameProps): JSX.Element => {
  const [gameName, setGameName] = useState('');
  const { createAndJoinNewGame } = useGameServer();
  // const [showGameCode, setShowGameCode] = useState(false);

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      createAndJoinNewGame(gameName);
    }
  };

  return (
    <Wrapper className={className}>
      <div className='container'>
        <Title>Pick a name for your game</Title>
        <Input
          type='text'
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
        />
        <Button onClick={() => createAndJoinNewGame(gameName)}>GO</Button>
      </div>
      {/* {showGameCode && (
        <>
          <div className='container'>
            <Title>
              Your game code is <span className='code'>3e32ewrk</span> Share it
              with your friends!
            </Title>
          </div>
          <div className='container'>
            <Button>Start game!</Button>
          </div>
        </>
      )}
      <div></div> */}
    </Wrapper>
  );
};

export default NewGame;
