import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { ButtonSmall, Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 2rem;
  table {
    padding: 2rem 0 2rem 0;

    width: 70%;
    /* height: 50%; */

    th,
    td {
      text-align: center;
    }
  }
`;

interface IStartProps {
  className: string;
}

const Won = ({ className }: IStartProps): JSX.Element => {
  const { gameResults, leaveGame } = useGameServer();

  if (!gameResults) return <></>;

  return (
    <Wrapper className={className}>
      <Title>GAME OVER</Title>
      <div>
        Game duration{' '}
        {timeToString(gameResults.game.startTime, gameResults.game.endTime)}
      </div>
      <Title>Player ranking</Title>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Victory points</th>
            <th>Contracts fulfilled</th>
          </tr>
        </thead>
        <tbody>
          {gameResults.playerStats.map((player) => (
            <tr key={player.uuid}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.victoryPoints}</td>
              <td>{player.nrContractsFulfilled}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonSmall onClick={() => leaveGame()}>Start over</ButtonSmall>
    </Wrapper>
  );
};

export default Won;
