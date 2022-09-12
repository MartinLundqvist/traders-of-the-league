import styled from 'styled-components';
import {
  IAchievement,
  IAchievementProgress,
} from '../../../../../shared/types';
import { Achievement } from './Achievement';
import { useGameServer } from '../../../contexts/GameServerProvider';
import url_scroll from '../../../assets/ui/gui_player_status.png';

const Wrapper = styled.div`
  position: relative;
  width: 5rem;

  &:hover {
    .playerstats {
      opacity: 1;
      top: -25%;
    }
  }

  .playerstats {
    background-image: url('${url_scroll}');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
    position: absolute;
    padding: 0.5rem 1.2rem 0.5rem 1.2rem;
    height: auto;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    /* background-color: var(--color-bg);
    box-shadow: 3px 3px 3px var(--color-bg-shadow); */
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    transition: all 200ms ease-in-out;

    .player-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      min-width: 100%;
    }

    .title {
      font-size: 1rem;
    }
  }
`;

interface IAchievementWithPlayerStatsProps {
  achievement: IAchievement;
}

export const AchievementWithPlayerStats = ({
  achievement,
}: IAchievementWithPlayerStatsProps): JSX.Element => {
  const { game } = useGameServer();

  const getAchievementStats = (
    playerUuid: string
  ): IAchievementProgress | null => {
    const player = game?.players.find(
      (player) => player.user.uuid === playerUuid
    );

    if (!player) return null;

    const achievementProgress = player?.achievementsProgress.find(
      (ap) => ap.achievementName === achievement.name
    );

    if (!achievementProgress) return null;

    return achievementProgress;
  };

  return (
    <Wrapper>
      <Achievement achievement={achievement} />
      <div className='playerstats'>
        <div className='title'>Players' progress</div>
        {game?.players.map((player) => (
          <div key={player.user.uuid} className='player-container'>
            <div>{player.user.name}</div>
            <div>
              {getAchievementStats(player.user.uuid)?.progress} /{' '}
              {getAchievementStats(player.user.uuid)?.target}{' '}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
