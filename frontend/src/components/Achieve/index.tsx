import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, TitleSmall } from '../../elements/Typography';
import { Achievement } from './Achievement';

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

  .container {
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

interface IAchieveProps {
  className: string;
}

const Achieve = ({ className }: IAchieveProps): JSX.Element => {
  const { availableAchievements } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>You earned the following achievements!</Title>
      <div className='container'>
        {availableAchievements.map((achievement) => (
          <Achievement key={achievement.name} achievement={achievement} />
        ))}
      </div>
      <TitleSmall>Pick one</TitleSmall>
    </Wrapper>
  );
};

export default Achieve;
