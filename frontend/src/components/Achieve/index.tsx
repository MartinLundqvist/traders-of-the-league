import { useEffect } from 'react';
import styled from 'styled-components';
import { IAchievement } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import ScrollFull from '../../elements/ScrollFull';
import { Title, TitleSmall } from '../../elements/Typography';
import { Achievement } from './elements/Achievement';

const Container = styled.div`
  position: relative;
  display: grid;
  place-content: center;
  place-items: center;
  padding: 10rem 0 2rem 0;
  grid-template-rows: 1fr 4fr 1fr;
  gap: 0.5rem;

  .achievements-container {
    display: flex;
    gap: 1rem;

    > * {
      width: 6rem;
    }
  }
`;

interface IAchieveProps {
  className: string;
}

const Achieve = ({ className }: IAchieveProps): JSX.Element => {
  const { game, pickAchievement } = useGameServer();

  const { setActiveActionRoute } = useLayout();

  const handlePickAchievementClick = (achievement: IAchievement) => {
    pickAchievement(achievement);
    setActiveActionRoute('none');
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (game?.state.currentRound.achievementsEarned.length === 1) {
      timeout = setTimeout(
        () =>
          handlePickAchievementClick(
            game?.state.currentRound.achievementsEarned[0]
          ),
        3000
      );
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [game]);

  return (
    <ScrollFull achievement className={className}>
      <Container>
        <Title>You earned the following achievements!</Title>
        <div className='achievements-container'>
          {game?.state.currentRound.achievementsEarned.map((achievement) => (
            <Achievement
              key={achievement.name}
              achievement={achievement}
              onClick={() => handlePickAchievementClick(achievement)}
            />
          ))}
        </div>
        {game && game.state.currentRound.achievementsEarned.length > 1 && (
          <TitleSmall>Pick one</TitleSmall>
        )}
      </Container>
    </ScrollFull>
  );
};

export default Achieve;
