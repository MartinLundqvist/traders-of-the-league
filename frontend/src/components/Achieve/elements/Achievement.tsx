import styled from 'styled-components';
import { IAchievement } from '../../../../../shared/types';
import { IMAGES } from '../../../elements/Images';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;
  filter: drop-shadow(0px 0px 10px white);
`;

type TAchievementMap = {
  [key: string]: JSX.Element;
};

const ACHIEVEMENTS: TAchievementMap = {
  'Banker_A_2-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.bankerA} />,
  'Banker_B_2-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.bankerB} />,
  'Diversifier_A_2-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.diversifierA} />,
  'Diversifier_B_2-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.diversifierB} />,
  'Explorer_A_2-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.explorerA} />,
  'Explorer_B_2-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.explorerB} />,
  'Merchant_A_4-5_5P': <IMG src={IMAGES.ACHIEVEMENTS.merchantA} />,
  'Merchant_A_2-3_5P': <IMG src={IMAGES.ACHIEVEMENTS.merchantA2} />,
  'Merchant_B_4-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.merchantB} />,
  'Merchant_B_2-3_4P': <IMG src={IMAGES.ACHIEVEMENTS.merchantB2} />,
  'Monopolist_A_2-3_4P': <IMG src={IMAGES.ACHIEVEMENTS.monopolistA} />,
  'Monopolist_B_4-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.monopolistB} />,
  'Regional_A_2-5_5P': <IMG src={IMAGES.ACHIEVEMENTS.regionalTraderA} />,
  'Regional_B_2-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.regionalTraderB} />,
  'Specialist_A_2-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.specialistA} />,
  'Specialist_B_2-5_4P': <IMG src={IMAGES.ACHIEVEMENTS.specialistB} />,
  'Supplier_A_2-3_4P': <IMG src={IMAGES.ACHIEVEMENTS.supplierA} />,
  'Supplier_B_4-5_3P': <IMG src={IMAGES.ACHIEVEMENTS.supplierB} />,
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
      {ACHIEVEMENTS[achievement.uuid]}
    </Wrapper>
  );
};
