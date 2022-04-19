import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Controls = (): JSX.Element => {
  const { session, game, startGame, endRound, isMyTurn, isMyGameToStart } =
    useGameServer();

  return (
    <Wrapper>
      <TitleSmall>Controls</TitleSmall>
      {isMyGameToStart && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {game?.state.started && (
        <>
          <div>
            {/* <ButtonSmall disabled={!isMyTurn()}>Sail</ButtonSmall> */}
            <ButtonSmall disabled={!isMyTurn}>Load</ButtonSmall>
            <ButtonSmall disabled={!isMyTurn}>Trade</ButtonSmall>
            <ButtonSmall disabled={!isMyTurn}>Ditch</ButtonSmall>
          </div>
          <div>
            <ButtonSmall disabled={!isMyTurn} onClick={() => endRound()}>
              End round
            </ButtonSmall>
          </div>
        </>
      )}
    </Wrapper>
  );
};
