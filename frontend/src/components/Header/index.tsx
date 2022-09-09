import { useGameServer } from '../../contexts/GameServerProvider';
import url_logo from '../../assets/ui/traders_of_the_league_logo.png';
import url_city from '../../assets/ui/gui_button_city_emptied.png';
import url_moveLeft from '../../assets/ui/gui_button_moves_left.png';
import styled from 'styled-components';
import Card from '../../elements/Card';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;x
  justify-content: start;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background: linear-gradient(
    var(--color-background-dark),
    var(--color-background-medium)
  );
  border-bottom: 2px solid black;

  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    border-bottom: 2px solid black;
    z-index: -1;
  }

  /* background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 3px 5px var(--color-bg-shadow); */

  .cities-emptied {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 100%;
    height: 100%;
    font-size: 2rem;

    img {
      height: 70%;
    }
  }

  .logo {
    /* display: inline-block;
    aspect-ratio: 2.5 / 2.2;
    height: 2.5rem;
    width: 2.2rem;
    background-image: url('${url_logo}');
    background-size: cover;
    margin-right: 1rem; */

    height: 100%;
  }

  .moves-left {
    position: relative;
    height: 100%;
    width: 100%;
    font-size: 1.2rem;
    margin-left: 2rem;
  }
`;

const MovesLeft = styled.img`
  content: url('${url_moveLeft}');
  height: 50%;
  padding-right: 1rem;
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { me, game, currentTurnPlayer } = useGameServer();

  const citiesEmptied: string = game
    ? game.state.numberOfCitiesEmptied.toString() +
      '/' +
      game.numberOfCitiesToEmpty.toString()
    : '';

  const movesLeft = (): JSX.Element[] => {
    let result: JSX.Element[] = [];

    if (!game) return result;

    for (let i = 0; i < game.state.currentRound.movesLeft; i++) {
      result.push(<MovesLeft key={i} />);
    }

    return result;
  };

  return (
    <Wrapper className={className}>
      <img className='logo' src={url_logo}></img>
      {/* <div className='logo'></div> */}
      <Card title='You are' content={me.name ? me.name : 'Not registered'} />
      {game && (
        <>
          <Card title='Game' content={game?.name} />
          <Card
            title='Status'
            content={game?.state.status}
            pulse={game?.state.status === 'endgame'}
          />
          <div className='cities-emptied'>
            <img src={url_city} />
            {citiesEmptied}
          </div>
          {/* <Card title='Round' content={game?.state.round.toString()} /> */}
          <Card title='Turn' content={currentTurnPlayer?.user.name || ''} />
          <div className='moves-left'>
            <div>Moves left</div>
            {movesLeft()}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
