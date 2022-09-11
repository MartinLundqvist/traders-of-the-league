import styled from 'styled-components';
import {
  IAchievement,
  IContract,
  IEmptiedCity,
} from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import ScrollFull from '../../elements/ScrollFull';
import { ButtonSmall, Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';
import Contract from '../Board/Contract';
import url_gameover from '../../assets/ui/gui_game_over.png';
import { Achievement } from '../Achieve/elements/Achievement';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  overflow: hidden;
  height: 100%;
  width: 100%;

  .scrollable {
    overflow-y: scroll;
  }

  img.image {
    width: 30%;
  }

  table {
    border-spacing: 1rem;

    th,
    td {
      text-align: left;
      vertical-align: top;

      .points {
        font-size: 2rem;
      }
    }
  }

  .container-contracts {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
  .container-achievements {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  .container-text {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    gap: 1rem;
    /* display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1rem; */
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
    <ScrollFull landscape className={className}>
      <Container>
        <img className='image' src={url_gameover} />
        <Title>
          GAME OVER after{' '}
          {timeToString(gameResults.game.startTime, gameResults.game.endTime)}
        </Title>

        {/* <Title>Player ranking</Title> */}
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
                    <div className='container-contracts'>
                      {getContracts(player.uuid).map((contract) => (
                        <Contract key={contract.uuid} contract={contract} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className='container-text'>
                      {getCities(player.uuid).map((city) => (
                        <div key={city.name}>{city.name}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className='container-achievements'>
                      {getAchievements(player.uuid).map((achievement) => (
                        <Achievement
                          key={achievement.name}
                          achievement={achievement}
                        />
                        // <div key={achievement.name}>{achievement.name}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className='points'>{player.victoryPoints}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ButtonSmall onClick={() => leaveGame()}>Start over</ButtonSmall>
      </Container>
    </ScrollFull>
  );
};

export default Won;
