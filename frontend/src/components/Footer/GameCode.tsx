import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`

  span {
    font-family: 'Roboto';
    font-size: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }
}
`;

export const GameCode = (): JSX.Element => {
  const { game } = useGameServer();

  const copyToClipBoard = async () => {
    if (!game) return;
    await navigator.clipboard.writeText(game.uuid);
    window.alert('Copied code ' + game.uuid + ' to clipboard.');
  };

  return (
    <Wrapper>
      <TitleSmall>Game Code (click to copy)</TitleSmall>
      <div>
        <span id='code' onClick={() => copyToClipBoard()}>
          {game?.uuid}
        </span>
      </div>
    </Wrapper>
  );
};
