import styled from 'styled-components';
import { IAchievement } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { Button, ButtonSmall, Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: var(--color-fill-sea-opaque);
  backdrop-filter: blur(10px);
  z-index: 10;
`;

interface IAchieveProps {
  className: string;
}

const Achieve = ({ className }: IAchieveProps): JSX.Element => {
  const { availableAchievements, pickAchievement } = useGameServer();
  const { setActiveActionRoute } = useLayout();

  const handlePickAchievementClick = (achievement: IAchievement) => {
    pickAchievement(achievement);
    setActiveActionRoute('none');
  };

  return (
    <Wrapper className={className}>
      <Title>Achieve</Title>
      {availableAchievements.map((achievement) => (
        <div>
          <div key={achievement.name}>{achievement.name}</div>
          <ButtonSmall onClick={() => handlePickAchievementClick(achievement)}>
            Pick
          </ButtonSmall>
        </div>
      ))}
    </Wrapper>
  );
};

export default Achieve;
