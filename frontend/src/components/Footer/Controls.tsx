import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Controls = (): JSX.Element => {
  const {
    startGame,
    endRound,
    isMyTurn,
    isMyGame,
    gameStatus,
    // isPlaying,
    // isWon,
    // isTerminated,
    canTrade,
    canLoad,
    canAchieve,
  } = useGameServer();

  const { setActiveActionRoute } = useLayout();

  if (gameStatus === 'won' || gameStatus === 'terminated') return <div></div>;

  return (
    <Wrapper>
      <TitleSmall>
        {gameStatus === 'playing'
          ? isMyTurn
            ? 'Make a move'
            : 'Wait for your turn'
          : 'Not started'}
      </TitleSmall>
      {isMyGame && gameStatus === 'waiting' && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {(gameStatus === 'playing' || gameStatus === 'endgame') && (
        <>
          <div>
            <ButtonSmall
              disabled={!canLoad}
              onClick={() => setActiveActionRoute('load')}
            >
              Load
            </ButtonSmall>
            <ButtonSmall
              disabled={!canTrade}
              onClick={() => setActiveActionRoute('trade')}
            >
              Trade
            </ButtonSmall>
            <ButtonSmall
              disabled={!isMyTurn}
              onClick={() => setActiveActionRoute('ditch')}
            >
              Ditch
            </ButtonSmall>
          </div>
          <div>
            <ButtonSmall
              disabled={!isMyTurn || canAchieve}
              onClick={() => endRound()}
            >
              End round
            </ButtonSmall>
            <ButtonSmall
              disabled={!canAchieve}
              pulse={canAchieve}
              onClick={() => setActiveActionRoute('achieve')}
            >
              Pick achievements
            </ButtonSmall>
          </div>
        </>
      )}
    </Wrapper>
  );
};
