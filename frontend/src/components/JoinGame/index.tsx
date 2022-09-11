import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IActiveGame } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import Scroll from '../../elements/Scroll';
import ScrollFull from '../../elements/ScrollFull';
import {
  Title,
  TitleSmall,
  ButtonSmall,
  TitleButton,
} from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

interface IJoinGameProps {
  className: string;
}

const JoinGame = ({ className }: IJoinGameProps): JSX.Element => {
  // const [gameUuid, setGameUuid] = useState('');
  const { joinGame, getActiveGames } = useGameServer();
  const { setActiveRoute } = useLayout();
  const [activeGames, setActiveGames] = useState<IActiveGame[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const games = await getActiveGames();
      if (games.length > 0) {
        setActiveGames(games);
      }
    };

    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (game: IActiveGame) => {
    if (window.confirm(`Are you sure you want to join ${game.name}?`)) {
      joinGame(game.uuid);
    }
  };

  return (
    <ScrollFull className={className}>
      <Container>
        <TitleSmall>List updates every 2 seconds</TitleSmall>
        <Title>Click to join a game</Title>

        {activeGames.map((game) => (
          <TitleButton
            key={game.uuid}
            className='link'
            onClick={() => handleClick(game)}
          >
            {game.name +
              ': ' +
              game.players[0].user.name +
              ', ' +
              game.players.length +
              ' player(s) waiting'}
          </TitleButton>
        ))}

        <ButtonSmall onClick={() => setActiveRoute('start')}>
          Back to menu
        </ButtonSmall>
      </Container>
    </ScrollFull>
  );
};

export default JoinGame;
