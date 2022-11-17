import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import ScrollFull from '../../elements/ScrollFull';
import {
  Title,
  Input,
  ButtonSmall,
  Select,
  SelectSmall,
  CheckBox,
} from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .inputs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

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
  const [gameTempo, setGameTempo] = useState(5 * 60 * 1000);
  const [ranked, setRanked] = useState(false);
  const { createAndJoinNewGame } = useGameServer();
  const { setActiveRoute } = useLayout();

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      createAndJoinNewGame(gameName, gameTempo, ranked);
    }
  };

  useEffect(() => {
    console.log(ranked);
  }, [ranked]);

  return (
    <ScrollFull className={className}>
      <Container>
        <Title>Pick a name and a tempo for your game</Title>
        <div className='inputs'>
          <Input
            type='text'
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            autoFocus
          />
          <div className='options'>
            <SelectSmall
              value={gameTempo}
              onChange={(e) => setGameTempo(parseInt(e.target.value))}
            >
              <option value={1 * 60 * 1000}>1 mins</option>
              <option value={5 * 60 * 1000}>5 mins</option>
              <option value={15 * 60 * 1000}>15 mins</option>
              <option value={60 * 60 * 1000}>1 hour</option>
            </SelectSmall>
            <CheckBox
              id='ranked'
              onChange={(e) => setRanked(e.target.checked)}
              label='Ranked?'
            />
          </div>
        </div>
        <div className='buttons'>
          <ButtonSmall warning onClick={() => setActiveRoute('start')}>
            Back
          </ButtonSmall>
          <ButtonSmall
            onClick={() => createAndJoinNewGame(gameName, gameTempo, ranked)}
          >
            Create
          </ButtonSmall>
        </div>
      </Container>
    </ScrollFull>
  );
};

export default NewGame;
