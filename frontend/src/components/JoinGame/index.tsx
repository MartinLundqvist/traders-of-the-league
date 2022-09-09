import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IActiveGame } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import Scroll from '../../elements/Scroll';
import {
  Title,
  TitleSmall,
  ButtonSmall,
  TitleButton,
} from '../../elements/Typography';

// const Container = styled.div`
//   li {
//     list-style: none;
//     font-size: 2rem;
//     transition: all 200ms ease-in-out;

//     &:hover {
//       cursor: pointer;
//       transform: translate(-3px, -3px);
//       text-shadow: 5px 5px 3px hsla(57, 145%, 30%, 0.6);
//     }
//   }
// `;

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
    <Scroll className={className}>
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
    </Scroll>
  );
};

export default JoinGame;
