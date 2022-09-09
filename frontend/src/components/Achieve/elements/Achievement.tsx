import styled from 'styled-components';
import { IAchievement, TAchievement } from '../../../../../shared/types';
import bankerA from '../../../assets/achievements/Banker_A_2-5_3P.png';
import bankerB from '../../../assets/achievements/Banker_B_2-5_4P.png';
import diversifierA from '../../../assets/achievements/Diversifier_A_2-5_4P.png';
import diversifierB from '../../../assets/achievements/Diversifier_B_2-5_4P.png';
import explorerA from '../../../assets/achievements/Explorer_A_2-5_4P.png';
import explorerB from '../../../assets/achievements/Explorer_B_2-5_3P.png';
import merchantA from '../../../assets/achievements/Merchant_A_2-3_5P.png';
import merchantB from '../../../assets/achievements/Merchant_B_2-3_4P.png';
import monopolistA from '../../../assets/achievements/Monopolist_A_2-3_4P.png';
import monopolistB from '../../../assets/achievements/Monopolist_B_4-5_3P.png';
import regionalTraderA from '../../../assets/achievements/Regional_A_2-5_5P.png';
import regionalTraderB from '../../../assets/achievements/Regional_B_2-5_3P.png';
import specialistA from '../../../assets/achievements/Specialist_A_2-5_3P.png';
import specialistB from '../../../assets/achievements/Specialist_B_2-5_4P.png';
import supplierA from '../../../assets/achievements/Supplier_A_2-3_4P.png';
import supplierB from '../../../assets/achievements/Supplier_B_4-5_3P.png';

const IMG = styled.img`
  height: 100%;
  width: 100%;
  /* filter: drop-shadow(3px 3px 4px var(--color-bg-shadow)); */
  filter: drop-shadow(0px 0px 10px white);
`;

type TAchievementMap = {
  [key in TAchievement]: JSX.Element;
};

const ACHIEVEMENTS: TAchievementMap = {
  'Diversifier A': <IMG src={diversifierA} />,
  'Diversifier B': <IMG src={diversifierB} />,
  'Regional Trader A': <IMG src={regionalTraderA} />,
  'Regional Trader B': <IMG src={regionalTraderB} />,
  'Monopolist A': <IMG src={monopolistA} />,
  'Monopolist B': <IMG src={monopolistB} />,
  'Explorer A': <IMG src={explorerA} />,
  'Explorer B': <IMG src={explorerB} />,
  'Supplier A': <IMG src={supplierA} />,
  'Supplier B': <IMG src={supplierB} />,
  'Specialist A': <IMG src={specialistA} />,
  'Specialist B': <IMG src={specialistB} />,
  'Merchant A': <IMG src={merchantA} />,
  'Merchant B': <IMG src={merchantB} />,
  'Banker A': <IMG src={bankerA} />,
  'Banker B': <IMG src={bankerB} />,
};

const Wrapper = styled.div`
  position: relative;
  height: 8rem;
  width: 7rem;
  /* padding: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0 0 50% 50%;
  background-color: var(--color-bg);
  box-shadow: 3px 3px 3px var(--color-bg-shadow); */
  transition: transform 100ms ease-in-out;
  /* overflow: hidden; */

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
      {/* <div>{achievement.name}</div> */}
      {/* <Value value={achievement.value} /> */}
    </Wrapper>
  );
};
