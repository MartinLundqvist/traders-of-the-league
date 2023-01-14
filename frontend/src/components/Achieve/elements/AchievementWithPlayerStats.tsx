import styled from 'styled-components';
import {
  IAchievement,
  IAchievementProgress,
  TAchievedTargets,
  TTargetType,
} from '../../../../../shared/types';
import { Achievement } from './Achievement';
import { useGameServer } from '../../../contexts/GameServerProvider';
import { IMAGES } from '../../../elements/Images';
import { truncatePlayerName } from '../../../utils/truncatePlayerName';
import Contract from '../../Board/Contract';
import Good from '../../Board/Good';
import { Divider } from '../../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  width: 5rem;

  &:hover {
    .playerstats {
      opacity: 1;
      top: -100%;
      left: -100%;
    }
  }

  .playerstats {
    background-image: url('${IMAGES.UI.SCROLLS.scroll_landscape}');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
    position: absolute;
    padding: 1.5rem 1rem 1.5rem 1rem;
    height: auto;
    max-height: 75vh;
    min-width: 30ch;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.25rem;
    font-size: 0.8rem;
    opacity: 0;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;

    transition: all 200ms ease-in-out;

    .player-container {
      min-width: 100%;
    }

    .player-color {
      display: inline-block;
      margin-right: 0.5rem;
      height: 0.7rem;
      aspect-ratio: 1 / 1;
      opacity: 0.9;

      &.black {
        background-color: black;
      }
      &.red {
        background-color: red;
      }
      &.blue {
        background-color: blue;
      }
      &.green {
        background-color: green;
      }
      &.yellow {
        background-color: yellow;
      }
    }

    .title {
      font-size: 1rem;
    }
    .description {
      font-size: 0.8rem;
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
      (ap) => ap.uuid === achievement.uuid
    );

    if (!achievementProgress) return null;

    return achievementProgress;
  };

  return (
    <Wrapper>
      <Achievement achievement={achievement} />
      <div className='playerstats'>
        <div className='description'>{achievement.description}</div>
        {game?.players.map((player) => (
          <div key={player.user.uuid} className='player-container'>
            <Divider landscape />
            <div>
              <span className={'player-color ' + player.color}></span>
              <span>
                {truncatePlayerName(player.user.name, 10) + ' '}
                {getAchievementStats(player.user.uuid)?.progress} /{' '}
                {getAchievementStats(player.user.uuid)?.target}{' '}
              </span>
            </div>

            <RenderTargets
              targetType={getAchievementStats(player.user.uuid)?.targetType!}
              achievedTargets={
                getAchievementStats(player.user.uuid)?.achievedTargets!
              }
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const InnerWrapper = styled.div`
  .contracts {
    display: grid;
    grid-template-columns: repeat(5, 1.75rem);
    isolation: isolate;

    .contract {
      .contract-region {
        font-size: 0.7em;
        z-index: 1;
        transform: translate(80%, 100%);
      }
    }
  }
  .cities {
    display: flex;
    flex-direction: column;

    img.city-image {
      width: 1.5rem;
      padding-right: 0.5rem;
    }
  }

  .cargo {
    display: grid;
    grid-template-columns: repeat(8, 1.5rem);
  }
`;

const RenderTargets = ({
  targetType,
  achievedTargets,
}: {
  targetType: TTargetType;
  achievedTargets: TAchievedTargets;
}): JSX.Element => {
  switch (targetType) {
    case 'contract':
      return (
        <InnerWrapper>
          <div className='contracts'>
            {achievedTargets.contracts!.map((target) => (
              <div className='contract' key={target.uuid}>
                <span className='contract-region'>{target.region}</span>
                <Contract contract={target} />
              </div>
            ))}
          </div>
        </InnerWrapper>
      );
    case 'city':
      return (
        <InnerWrapper>
          <div className='cities'>
            {achievedTargets.cities!.map((target) => (
              <div key={target.name}>
                <img
                  src={IMAGES.UI.BUTTONS.city_emptied}
                  className='city-image'
                />
                <span>{target.name}</span>
              </div>
            ))}
          </div>
        </InnerWrapper>
      );
    case 'cargo':
      return (
        <InnerWrapper>
          <div className='cargo'>
            {achievedTargets.cargo!.map((target, index) => (
              <Good key={target + index} good={target} />
            ))}
          </div>
        </InnerWrapper>
      );
  }

  return <></>;
};
