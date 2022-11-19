import styled from 'styled-components';
import { IAchievement } from '../../../../../shared/types';
import { IMAGES } from '../../../elements/Images';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;
  filter: drop-shadow(0px 0px 10px white);
`;

const Wrapper = styled.div`
  position: relative;
  transition: transform 100ms ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

interface IAchievementProps {
  achievement: IAchievement;
  onClick?: (anything: any) => void;
}

export const Achievement = ({
  achievement,
  onClick,
}: IAchievementProps): JSX.Element => {
  return (
    <Wrapper onClick={onClick || (() => {})}>
      <IMG src={IMAGES.ACHIEVEMENTS[achievement.uuid]} />
      {/* {ACHIEVEMENTS[achievement.uuid]} */}
    </Wrapper>
  );
};
