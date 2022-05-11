import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, TitleSmall } from '../../elements/Typography';
import logo from '../../favicon.png';
import styled from 'styled-components';
import Card from '../../elements/Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 3px 5px var(--color-bg-shadow);

  .logo {
    display: inline-block;
    aspect-ratio: 2.5 / 2.2;
    height: 2.5rem;
    width: 2.2rem;
    background-image: url('${logo}');
    background-size: cover;
    margin-right: 1rem;
  }
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { me, game, currentPlayer } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>
        <div className='logo'></div>Traders of the Hanseatic League
      </Title>
      <Card title='You are' content={me.name ? me.name : 'Not registered'} />
      {game && (
        <>
          <Card title='Game' content={game?.name} />
          <Card
            title='Status'
            content={game?.state.status}
            pulse={game?.state.status === 'endgame'}
          />
          <Card
            title='Cities emptied'
            content={`${game.state.numberOfCitiesEmptied.toString()} of ${game.numberOfCitiesToEmpty.toString()}`}
          />
          <Card title='Round' content={game?.state.round.toString()} />
          <Card title='Turn' content={currentPlayer?.user.name || ''} />
          <Card
            title='Moves left'
            content={game?.state.currentRound.movesLeft.toString()}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Header;
