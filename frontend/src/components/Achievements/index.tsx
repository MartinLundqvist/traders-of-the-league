import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { AchievementWithPlayerStats } from '../Achieve/elements/AchievementWithPlayerStats';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 2rem;
  margin-bottom: 2rem;

  .container {
    position: absolute;

    display: grid;
    padding: 0 1rem 0 0;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: row;
    bottom: 0;
    right: 0;
    gap: 0.5rem;
  }
`;

interface IAchievementsProps {
  className: string;
}

const Achievements = ({ className }: IAchievementsProps): JSX.Element => {
  const { game } = useGameServer();

  if (!game) return <></>;

  if (game.achievements.length < 1) return <></>;

  return (
    <Wrapper className={className}>
      <div className='container'>
        {game.achievements.map((achievement) => (
          <AchievementWithPlayerStats
            key={achievement.name}
            achievement={achievement}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Achievements;
