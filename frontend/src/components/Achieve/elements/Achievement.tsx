import styled from 'styled-components';
import { IAchievement, TAchievement } from '../../../../../shared/types';
import { IMAGES } from '../../../elements/Images';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;
  filter: drop-shadow(0px 0px 10px white);
`;

type TAchievementMap = {
  [key in TAchievement]: JSX.Element;
};

const ACHIEVEMENTS: TAchievementMap = {
  'Diversifier A': <IMG src={IMAGES.ACHIEVEMENTS.diversifierA} />,
  'Diversifier B': <IMG src={IMAGES.ACHIEVEMENTS.diversifierB} />,
  'Regional Trader A': <IMG src={IMAGES.ACHIEVEMENTS.regionalTraderA} />,
  'Regional Trader B': <IMG src={IMAGES.ACHIEVEMENTS.regionalTraderB} />,
  'Monopolist A': <IMG src={IMAGES.ACHIEVEMENTS.monopolistA} />,
  'Monopolist B': <IMG src={IMAGES.ACHIEVEMENTS.monopolistB} />,
  'Explorer A': <IMG src={IMAGES.ACHIEVEMENTS.explorerA} />,
  'Explorer B': <IMG src={IMAGES.ACHIEVEMENTS.explorerB} />,
  'Supplier A': <IMG src={IMAGES.ACHIEVEMENTS.supplierA} />,
  'Supplier B': <IMG src={IMAGES.ACHIEVEMENTS.supplierB} />,
  'Specialist A': <IMG src={IMAGES.ACHIEVEMENTS.specialistA} />,
  'Specialist B': <IMG src={IMAGES.ACHIEVEMENTS.specialistB} />,
  'Merchant A': <IMG src={IMAGES.ACHIEVEMENTS.merchantA} />,
  'Merchant B': <IMG src={IMAGES.ACHIEVEMENTS.merchantB} />,
  'Banker A': <IMG src={IMAGES.ACHIEVEMENTS.bankerA} />,
  'Banker B': <IMG src={IMAGES.ACHIEVEMENTS.bankerB} />,
};

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
      {ACHIEVEMENTS[achievement.name]}
    </Wrapper>
  );
};
