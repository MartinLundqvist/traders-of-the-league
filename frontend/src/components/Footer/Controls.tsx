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
    isStarted,
    isWon,
    canTrade,
    canLoad,
    canAchieve,
  } = useGameServer();

  const { setActiveActionRoute } = useLayout();

  if (isWon) return <div></div>;

  return (
    <Wrapper>
      <TitleSmall>{isMyTurn ? 'Make a move' : 'Wait for your turn'}</TitleSmall>
      {isMyGame && !isStarted && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {isStarted && (
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
