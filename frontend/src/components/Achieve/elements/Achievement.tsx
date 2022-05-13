import styled from 'styled-components';
import { IAchievement, TAchievement } from '../../../../../shared/types';
import { BankerA } from './BankerA';
import { BankerB } from './BankerB';
import { DiversifierA } from './DiversifierA';
import { DiversifierB } from './DiversifierB';
import { ExplorerA } from './ExplorerA';
import { ExplorerB } from './ExplorerB';
import { MerchantA } from './MerchantA';
import { MerchantB } from './MerchantB';
import { MonopolistA } from './MonopolistA';
import { MonopolistB } from './MonopolistB';
import { RegionalTraderA } from './RegionalTraderA';
import { RegionalTraderB } from './RegionalTraderB';
import { SpecialistA } from './SpecialistA';
import { SpecialistB } from './SpecialistB';
import { SupplierA } from './SupplierA';
import { SupplierB } from './SupplierB';
import { Value } from './Value';

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
  background-color: var(--color-bg);
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
  onClick?: (anything: any) => void;
}

export const Achievement = ({
  achievement,
  onClick,
}: IAchievementProps): JSX.Element => {
  return (
    <Wrapper onClick={onClick || (() => {})}>
      {ACHIEVEMENTS[achievement.name]}

      <div>{achievement.name}</div>
      <Value value={achievement.value} />
    </Wrapper>
  );
};
