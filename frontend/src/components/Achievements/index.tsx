import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Achievement } from '../Achieve/elements/Achievement';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .container {
    position: absolute;
    display: grid;
    padding: 0 1rem 0 0;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: row;
    bottom: 0;
    right: 0;
    gap: 1rem;
    transform: scale(0.8);
  }
`;

interface IAchievementsProps {
  className: string;
}

const Achievements = ({ className }: IAchievementsProps): JSX.Element => {
  const { achievements } = useGameServer();

  if (achievements.length < 1) return <></>;

  return (
    <Wrapper className={className}>
      <div className='container'>
        {achievements.map((achievement) => (
          <Achievement key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Achievements;
