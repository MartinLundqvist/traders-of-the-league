import styled from 'styled-components';
import { IContract } from '../../../../shared/types';

import C_blu_bla_1 from '../../assets/contracts/C_blu_bla_1.png';
import C_blu_bro_2 from '../../assets/contracts/C_blu_bro_2.png';
import C_bro_bla_2 from '../../assets/contracts/C_bro_bla_2.png';
import C_grn_blu_1 from '../../assets/contracts/C_grn_blu_1.png';
import C_grn_bla_1 from '../../assets/contracts/C_grn_bla_1.png';
import C_grn_bro_2 from '../../assets/contracts/C_grn_bro_2.png';
import C_gry_bla_2 from '../../assets/contracts/C_gry_bla_2.png';
import C_gry_blu_2 from '../../assets/contracts/C_gry_blu_2.png';
import C_gry_bro_3 from '../../assets/contracts/C_gry_bro_3.png';
import C_gry_grn_2 from '../../assets/contracts/C_gry_grn_2.png';
import C_red_bla_2 from '../../assets/contracts/C_red_bla_2.png';
import C_red_blu_2 from '../../assets/contracts/C_red_blu_2.png';
import C_red_bro_3 from '../../assets/contracts/C_red_bro_3.png';
import C_red_grn_3 from '../../assets/contracts/C_red_grn_3.png';
import C_red_gry_7 from '../../assets/contracts/C_red_gry_7.png';
import C_red_yel_2 from '../../assets/contracts/C_red_yel_2.png';
import C_yel_bla_1 from '../../assets/contracts/C_yel_bla_1.png';
import C_yel_blu_1 from '../../assets/contracts/C_yel_blu_1.png';
import C_yel_bro_2 from '../../assets/contracts/C_yel_bro_2.png';
import C_yel_gry_2 from '../../assets/contracts/C_yel_gry_2.png';

import E_blu_bla_1 from '../../assets/contracts/E_blu_bla_1.png';
import E_grn_bla_2 from '../../assets/contracts/E_grn_bla_2.png';
import E_grn_blu_2 from '../../assets/contracts/E_grn_blu_2.png';
import E_grn_bro_2 from '../../assets/contracts/E_grn_bro_2.png';
import E_gry_blu_1 from '../../assets/contracts/E_gry_blu_1.png';
import E_gry_bro_1 from '../../assets/contracts/E_gry_bro_1.png';
import E_gry_grn_2 from '../../assets/contracts/E_gry_grn_2.png';
import E_red_bla_3 from '../../assets/contracts/E_red_bla_3.png';
import E_red_blu_3 from '../../assets/contracts/E_red_blu_3.png';
import E_red_bro_3 from '../../assets/contracts/E_red_bro_3.png';
import E_red_grn_5 from '../../assets/contracts/E_red_grn_5.png';
import E_red_gry_3 from '../../assets/contracts/E_red_gry_3.png';
import E_red_yel_5 from '../../assets/contracts/E_red_yel_5.png';
import E_yel_bla_2 from '../../assets/contracts/E_yel_bla_2.png';
import E_yel_blu_2 from '../../assets/contracts/E_yel_blu_2.png';
import E_yel_bro_2 from '../../assets/contracts/E_yel_bro_2.png';
import E_yel_grn_3 from '../../assets/contracts/E_yel_grn_3.png';
import E_yel_gry_2 from '../../assets/contracts/E_yel_gry_2.png';
import W_blu_bla_2 from '../../assets/contracts/W_blu_bla_2.png';
import W_blu_bro_2 from '../../assets/contracts/W_blu_bro_2.png';
import W_bro_bla_1 from '../../assets/contracts/W_bro_bla_1.png';
import W_grn_blu_2 from '../../assets/contracts/W_grn_blu_2.png';
import W_grn_bla_1 from '../../assets/contracts/W_grn_bla_1.png';
import W_gry_bla_3 from '../../assets/contracts/W_gry_bla_3.png';
import W_gry_blu_5 from '../../assets/contracts/W_gry_blu_5.png';
import W_gry_bro_3 from '../../assets/contracts/W_gry_bro_3.png';
import W_gry_grn_3 from '../../assets/contracts/W_gry_grn_3.png';
import W_red_blu_2 from '../../assets/contracts/W_red_blu_2.png';
import W_red_bro_1 from '../../assets/contracts/W_red_bro_1.png';
import W_red_grn_1 from '../../assets/contracts/W_red_grn_1.png';
import W_red_gry_3 from '../../assets/contracts/W_red_gry_3.png';
import W_red_yel_2 from '../../assets/contracts/W_red_yel_2.png';
import W_yel_bla_2 from '../../assets/contracts/W_yel_bla_2.png';
import W_yel_blu_3 from '../../assets/contracts/W_yel_blu_3.png';
import W_yel_bro_2 from '../../assets/contracts/W_yel_bro_2.png';
import W_yel_grn_2 from '../../assets/contracts/W_yel_grn_2.png';
import W_yel_gry_5 from '../../assets/contracts/W_yel_gry_5.png';

const IMG = styled.img`
  max-width: 100%;
  max-height: 100%;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));
`;

type TContractMap = {
  [key: string]: JSX.Element;
};

const CONTRACTS: TContractMap = {
  C_blu_bla_1: <IMG src={C_blu_bla_1} />,
  C_blu_bro_2: <IMG src={C_blu_bro_2} />,
  C_bro_bla_2: <IMG src={C_bro_bla_2} />,
  C_grn_blu_1: <IMG src={C_grn_blu_1} />,
  C_grn_bla_1: <IMG src={C_grn_bla_1} />,
  C_grn_bro_2: <IMG src={C_grn_bro_2} />,
  C_gry_bla_2: <IMG src={C_gry_bla_2} />,
  C_gry_blu_2: <IMG src={C_gry_blu_2} />,
  C_gry_bro_3: <IMG src={C_gry_bro_3} />,
  C_gry_grn_2: <IMG src={C_gry_grn_2} />,
  C_red_bla_2: <IMG src={C_red_bla_2} />,
  C_red_blu_2: <IMG src={C_red_blu_2} />,
  C_red_bro_3: <IMG src={C_red_bro_3} />,
  C_red_grn_3: <IMG src={C_red_grn_3} />,
  C_red_gry_7: <IMG src={C_red_gry_7} />,
  C_red_yel_2: <IMG src={C_red_yel_2} />,
  C_yel_bla_1: <IMG src={C_yel_bla_1} />,
  C_yel_blu_1: <IMG src={C_yel_blu_1} />,
  C_yel_bro_2: <IMG src={C_yel_bro_2} />,
  C_yel_gry_2: <IMG src={C_yel_gry_2} />,
  E_blu_bla_1: <IMG src={E_blu_bla_1} />,
  E_grn_bla_2: <IMG src={E_grn_bla_2} />,
  E_grn_blu_2: <IMG src={E_grn_blu_2} />,
  E_grn_bro_2: <IMG src={E_grn_bro_2} />,
  E_gry_blu_1: <IMG src={E_gry_blu_1} />,
  E_gry_bro_1: <IMG src={E_gry_bro_1} />,
  E_gry_grn_2: <IMG src={E_gry_grn_2} />,
  E_red_bla_3: <IMG src={E_red_bla_3} />,
  E_red_blu_3: <IMG src={E_red_blu_3} />,
  E_red_bro_3: <IMG src={E_red_bro_3} />,
  E_red_grn_5: <IMG src={E_red_grn_5} />,
  E_red_gry_3: <IMG src={E_red_gry_3} />,
  E_red_yel_5: <IMG src={E_red_yel_5} />,
  E_yel_bla_2: <IMG src={E_yel_bla_2} />,
  E_yel_blu_2: <IMG src={E_yel_blu_2} />,
  E_yel_bro_2: <IMG src={E_yel_bro_2} />,
  E_yel_grn_3: <IMG src={E_yel_grn_3} />,
  E_yel_gry_2: <IMG src={E_yel_gry_2} />,
  W_blu_bla_2: <IMG src={W_blu_bla_2} />,
  W_blu_bro_2: <IMG src={W_blu_bro_2} />,
  W_bro_bla_1: <IMG src={W_bro_bla_1} />,
  W_grn_blu_2: <IMG src={W_grn_blu_2} />,
  W_grn_bla_1: <IMG src={W_grn_bla_1} />,
  W_gry_bla_3: <IMG src={W_gry_bla_3} />,
  W_gry_blu_5: <IMG src={W_gry_blu_5} />,
  W_gry_bro_3: <IMG src={W_gry_bro_3} />,
  W_gry_grn_3: <IMG src={W_gry_grn_3} />,
  W_red_blu_2: <IMG src={W_red_blu_2} />,
  W_red_bro_1: <IMG src={W_red_bro_1} />,
  W_red_grn_1: <IMG src={W_red_grn_1} />,
  W_red_gry_3: <IMG src={W_red_gry_3} />,
  W_red_yel_2: <IMG src={W_red_yel_2} />,
  W_yel_bla_2: <IMG src={W_yel_bla_2} />,
  W_yel_blu_3: <IMG src={W_yel_blu_3} />,
  W_yel_bro_2: <IMG src={W_yel_bro_2} />,
  W_yel_grn_2: <IMG src={W_yel_grn_2} />,
  W_yel_gry_5: <IMG src={W_yel_gry_5} />,
};

interface IContractProps {
  contract: IContract;
}

const Contract = ({ contract }: IContractProps): JSX.Element => {
  return <>{CONTRACTS[contract.uuid]}</>;
};

export default Contract;
