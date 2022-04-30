import styled from 'styled-components';
import { IAchievement } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';

const Wrapper = styled.div`
  height: 7rem;
  width: 6rem;
  padding-top: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0 0 50% 50%;
  background-color: white;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  transition: transform 100ms ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

interface IAchievementProps {
  achievement: IAchievement;
}

export const Achievement = ({
  achievement,
}: IAchievementProps): JSX.Element => {
  const { pickAchievement } = useGameServer();
  const { setActiveActionRoute } = useLayout();

  const handlePickAchievementClick = (achievement: IAchievement) => {
    pickAchievement(achievement);
    setActiveActionRoute('none');
  };

  return (
    <Wrapper onClick={() => handlePickAchievementClick(achievement)}>
      <div>{achievement.name}</div>
      <div>VP: {achievement.value}</div>
    </Wrapper>
  );
};
