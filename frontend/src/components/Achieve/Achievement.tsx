import styled from 'styled-components';
import { IAchievement, TAchievement } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { BankerA } from './elements/BankerA';
import { BankerB } from './elements/BankerB';
import { DiversifierA } from './elements/DiversifierA';
import { DiversifierB } from './elements/DiversifierB';
import { ExplorerA } from './elements/ExplorerA';
import { ExplorerB } from './elements/ExplorerB';
import { MerchantA } from './elements/MerchantA';
import { MerchantB } from './elements/MerchantB';
import { MonopolistA } from './elements/MonopolistA';
import { MonopolistB } from './elements/MonopolistB';
import { RegionalTraderA } from './elements/RegionalTraderA';
import { RegionalTraderB } from './elements/RegionalTraderB';
import { SpecialistA } from './elements/SpecialistA';
import { SpecialistB } from './elements/SpecialistB';
import { SupplierA } from './elements/SupplierA';
import { SupplierB } from './elements/SupplierB';
import { Value } from './elements/Value';

type TAchievementMap = {
  [key in TAchievement]: JSX.Element;
};

const ACHIEVEMENTS: TAchievementMap = {
  'Diversifier A': <DiversifierA />,
  'Diversifier B': <DiversifierB />,
  'Regional Trader A': <RegionalTraderA />,
  'Regional Trader B': <RegionalTraderB />,
  'Monopolist A': <MonopolistA />,
  'Monopolist B': <MonopolistB />,
  'Explorer A': <ExplorerA />,
  'Explorer B': <ExplorerB />,
  'Supplier A': <SupplierA />,
  'Supplier B': <SupplierB />,
  'Specialist A': <SpecialistA />,
  'Specialist B': <SpecialistB />,
  'Merchant A': <MerchantA />,
  'Merchant B': <MerchantB />,
  'Banker A': <BankerA />,
  'Banker B': <BankerB />,
};

const Wrapper = styled.div`
  position: relative;
  height: 7rem;
  width: 6rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0 0 50% 50%;
  background-color: white;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  transition: transform 100ms ease-in-out;
  overflow: hidden;

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
      {ACHIEVEMENTS[achievement.name]}

      <div>{achievement.name}</div>
      <Value value={achievement.value} />
    </Wrapper>
  );
};
