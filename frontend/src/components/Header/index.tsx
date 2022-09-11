import { useGameServer } from '../../contexts/GameServerProvider';
import url_logo from '../../assets/ui/traders_of_the_league_logo.png';
import url_city_emptied from '../../assets/ui/gui_button_city_emptied.png';
import url_city_not_emptied from '../../assets/ui/gui_button_city_not_emptied.png';
import url_moveLeft from '../../assets/ui/gui_button_moves_left.png';
import url_game_scroll from '../../assets/ui/gui_game_name_scroll.png';
import url_ship from '../../assets/ui/gui_button_your_turn.png';
import styled from 'styled-components';
// import Card from '../../elements/Card';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const Wrapper = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 5rem;
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

  .logo {
    height: 100%;
    min-width: max-content;
  }

  /* background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 3px 5px var(--color-bg-shadow); */

  .game-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;

    .cities-emptied {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 0.25rem;
      height: 80%;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;

      .cities-emptied--grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        img {
          grid-row: 1;
        }

        img:nth-child(1) {
          grid-column: 8;
        }
        img:nth-child(2) {
          grid-column: 7;
        }
        img:nth-child(3) {
          grid-column: 6;
        }
        img:nth-child(4) {
          grid-column: 5;
        }
        img:nth-child(5) {
          grid-column: 4;
        }
        img:nth-child(6) {
          grid-column: 3;
        }
        img:nth-child(7) {
          grid-column: 2;
        }
        img:nth-child(8) {
          grid-column: 1;
        }
        img:nth-child(9) {
          grid-column: 8;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(10) {
          grid-column: 7;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(11) {
          grid-column: 6;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(12) {
          grid-column: 5;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(13) {
          grid-column: 4;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(14) {
          grid-column: 3;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(15) {
          grid-column: 2;
          transform: translate(5px, 5px);
          z-index: -1;
        }
      }
    }

    .game-name {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 2rem;
      width: 100%;
      height: 100%;

      &::after {
        content: '';
        background-image: url('${url_game_scroll}');
        background-size: 30% 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display: inline-block;
        bottom: -20%;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .moves-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 0.25rem;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;

      .moves-left--grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        img {
          grid-row: 1;
        }
      }
    }
  }

  .game-state {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 0.5rem;
    height: 100%;
    min-width: max-content;

    .game-state--text {
      font-size: 1.2rem;
    }
  }
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { me, game, currentTurnPlayer } = useGameServer();

  const getMovesLeft = (): JSX.Element[] => {
    let result: JSX.Element[] = [];

    if (!game) return result;

    for (let i = 0; i < game.state.currentRound.movesLeft; i++) {
      result.push(<IMG src={url_moveLeft} key={i} />);
    }

    return result;
  };

  const getCitiesEmptied = (): JSX.Element[] => {
    let result: JSX.Element[] = [];

    if (!game) return result;

    for (let i = 0; i < game.state.numberOfCitiesEmptied; i++) {
      result.push(<IMG src={url_city_emptied} key={'ec' + i} />);
    }

    for (
      let i = 0;
      i < game.numberOfCitiesToEmpty - game.state.numberOfCitiesEmptied;
      i++
    ) {
      result.push(<IMG src={url_city_not_emptied} key={'nec' + i} />);
    }

    return result;
  };

  return (
    <Wrapper className={className}>
      <div className='logo'>
        <IMG src={url_logo} />
      </div>
      {/* <img className='logo' src={url_logo}></img> */}
      {/* <div className='logo'></div> */}
      {/* <Card title='You are' content={me.name ? me.name : 'Not registered'} /> */}
      {game && (
        <>
          <div className='game-container'>
            <div className='cities-emptied'>
              <div>Cities emptied</div>
              <div className='cities-emptied--grid'>{getCitiesEmptied()}</div>
            </div>
            <div className='game-name'>
              <div className='game-name--title'>{game.name}</div>
            </div>
            <div className='moves-left'>
              <div>Moves left</div>
              <div className='moves-left--grid'>{getMovesLeft()}</div>
            </div>
          </div>
          <div className='game-state'>
            <div className='game-state--text'>{game?.state.status}</div>
            <IMG src={url_ship} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
