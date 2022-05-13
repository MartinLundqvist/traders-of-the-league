import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Achievement } from '../Achieve/elements/Achievement';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: column;
  bottom: 0;
  right: 0;
  gap: 1rem;
  transform: scale(0.8);
`;

const Achievements = (): JSX.Element => {
  const { achievements } = useGameServer();

  return (
    <Wrapper>
      {achievements.map((achievement) => (
        <Achievement key={achievement.name} achievement={achievement} />
      ))}
    </Wrapper>
  );
};

export default Achievements;
