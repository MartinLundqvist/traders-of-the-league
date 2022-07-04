import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IActiveGame } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { Title, TitleSmall, ButtonSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    li {
      list-style: none;
      font-size: 2rem;
      transition: all 200ms ease-in-out;

      &:hover {
        cursor: pointer;
        transform: translate(-3px, -3px);
        text-shadow: 5px 5px 3px hsla(57, 145%, 30%, 0.6);
      }
    }
  }
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
    <Wrapper className={className}>
      <TitleSmall>List updates every 2 seconds</TitleSmall>
      <Title>Click to join a game</Title>
      <div className='container'>
        <ul>
          {activeGames.map((game) => (
            <li
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
            </li>
          ))}
        </ul>
      </div>
      <ButtonSmall onClick={() => setActiveRoute('start')}>
        Back to menu
      </ButtonSmall>
    </Wrapper>
  );
};

export default JoinGame;
