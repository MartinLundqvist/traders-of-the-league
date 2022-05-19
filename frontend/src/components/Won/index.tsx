import styled from 'styled-components';
import {
  IAchievement,
  IContract,
  IEmptiedCity,
} from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { ButtonSmall, Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';
import Contract from '../Board/Contract';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1.5rem;
  overflow: hidden;
  padding-bottom: 1rem;

  .scrollable {
    overflow: scroll;
  }

  table {
    border-spacing: 2rem;
    width: 100%;

    th,
    td {
      text-align: left;
    }
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1rem;
  }

  .city {
    padding-right: 1rem;
  }
`;

interface IStartProps {
  className: string;
}

const Won = ({ className }: IStartProps): JSX.Element => {
  const { gameResults, leaveGame } = useGameServer();

  const getContracts = (playerUuid: string): IContract[] => {
    if (!gameResults) return [];

    const contracts = gameResults.game.players.find(
      (player) => player.user.uuid === playerUuid
    )?.contractsFulfilled;

    if (!contracts) return [];

    return contracts;
  };

  const getCities = (playerUuid: string): IEmptiedCity[] => {
    if (!gameResults) return [];

    const cities = gameResults.game.players.find(
      (player) => player.user.uuid === playerUuid
    )?.citiesEmptied;

    if (!cities) return [];

    return cities;
  };

  const getAchievements = (playerUuid: string): IAchievement[] => {
    if (!gameResults) return [];

    const achievements = gameResults.game.players.find(
      (player) => player.user.uuid === playerUuid
    )?.achievements;

    if (!achievements) return [];

    return achievements;
  };

  if (!gameResults) return <></>;

  return (
    <Wrapper className={className}>
      <Title>
        GAME OVER after{' '}
        {timeToString(gameResults.game.startTime, gameResults.game.endTime)}
      </Title>

      <Title>Player ranking</Title>
      <div className='scrollable'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Contracts fulfilled</th>
              <th>Cities Emptied</th>
              <th>Achievements</th>
              <th>VPs</th>
            </tr>
          </thead>
          <tbody>
            {gameResults.playerStats.map((player) => (
              <tr key={player.uuid}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>
                  <div className='container'>
                    {getContracts(player.uuid).map((contract) => (
                      <Contract key={contract.uuid} contract={contract} />
                    ))}
                  </div>
                </td>
                <td>
                  <div className='container'>
                    {getCities(player.uuid).map((city) => (
                      <div key={city.name} className='city'>
                        {city.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className='container achievements'>
                    {getAchievements(player.uuid).map((achievement) => (
                      <div key={achievement.name} className='city'>
                        {achievement.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{player.victoryPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonSmall onClick={() => leaveGame()}>Start over</ButtonSmall>
    </Wrapper>
  );
};

export default Won;
