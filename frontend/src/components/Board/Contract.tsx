import styled from 'styled-components';
import { IContract } from '../../../../shared/types';
import { IMAGES } from '../../elements/Images';

const IMG = styled.img`
  max-width: 100%;
  max-height: 100%;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));
`;

type TContractMap = {
  [key: string]: JSX.Element;
};

const CONTRACTS: TContractMap = {
  C_blu_bla_1: <IMG src={IMAGES.CONTRACTS.C_blu_bla_1} />,
  C_blu_bro_2: <IMG src={IMAGES.CONTRACTS.C_blu_bro_2} />,
  C_bro_bla_2: <IMG src={IMAGES.CONTRACTS.C_bro_bla_2} />,
  C_grn_blu_1: <IMG src={IMAGES.CONTRACTS.C_grn_blu_1} />,
  C_grn_bla_1: <IMG src={IMAGES.CONTRACTS.C_grn_bla_1} />,
  C_grn_bro_2: <IMG src={IMAGES.CONTRACTS.C_grn_bro_2} />,
  C_gry_bla_2: <IMG src={IMAGES.CONTRACTS.C_gry_bla_2} />,
  C_gry_blu_2: <IMG src={IMAGES.CONTRACTS.C_gry_blu_2} />,
  C_gry_bro_3: <IMG src={IMAGES.CONTRACTS.C_gry_bro_3} />,
  C_gry_grn_2: <IMG src={IMAGES.CONTRACTS.C_gry_grn_2} />,
  C_red_bla_2: <IMG src={IMAGES.CONTRACTS.C_red_bla_2} />,
  C_red_blu_2: <IMG src={IMAGES.CONTRACTS.C_red_blu_2} />,
  C_red_bro_3: <IMG src={IMAGES.CONTRACTS.C_red_bro_3} />,
  C_red_grn_3: <IMG src={IMAGES.CONTRACTS.C_red_grn_3} />,
  C_red_gry_7: <IMG src={IMAGES.CONTRACTS.C_red_gry_7} />,
  C_red_yel_2: <IMG src={IMAGES.CONTRACTS.C_red_yel_2} />,
  C_yel_bla_1: <IMG src={IMAGES.CONTRACTS.C_yel_bla_1} />,
  C_yel_blu_1: <IMG src={IMAGES.CONTRACTS.C_yel_blu_1} />,
  C_yel_bro_2: <IMG src={IMAGES.CONTRACTS.C_yel_bro_2} />,
  C_yel_gry_2: <IMG src={IMAGES.CONTRACTS.C_yel_gry_2} />,
  E_blu_bla_1: <IMG src={IMAGES.CONTRACTS.E_blu_bla_1} />,
  E_grn_bla_2: <IMG src={IMAGES.CONTRACTS.E_grn_bla_2} />,
  E_grn_blu_2: <IMG src={IMAGES.CONTRACTS.E_grn_blu_2} />,
  E_grn_bro_2: <IMG src={IMAGES.CONTRACTS.E_grn_bro_2} />,
  E_gry_blu_1: <IMG src={IMAGES.CONTRACTS.E_gry_blu_1} />,
  E_gry_bro_1: <IMG src={IMAGES.CONTRACTS.E_gry_bro_1} />,
  E_gry_grn_2: <IMG src={IMAGES.CONTRACTS.E_gry_grn_2} />,
  E_red_bla_3: <IMG src={IMAGES.CONTRACTS.E_red_bla_3} />,
  E_red_blu_3: <IMG src={IMAGES.CONTRACTS.E_red_blu_3} />,
  E_red_bro_3: <IMG src={IMAGES.CONTRACTS.E_red_bro_3} />,
  E_red_grn_5: <IMG src={IMAGES.CONTRACTS.E_red_grn_5} />,
  E_red_gry_3: <IMG src={IMAGES.CONTRACTS.E_red_gry_3} />,
  E_red_yel_5: <IMG src={IMAGES.CONTRACTS.E_red_yel_5} />,
  E_yel_bla_2: <IMG src={IMAGES.CONTRACTS.E_yel_bla_2} />,
  E_yel_blu_2: <IMG src={IMAGES.CONTRACTS.E_yel_blu_2} />,
  E_yel_bro_2: <IMG src={IMAGES.CONTRACTS.E_yel_bro_2} />,
  E_yel_grn_3: <IMG src={IMAGES.CONTRACTS.E_yel_grn_3} />,
  E_yel_gry_2: <IMG src={IMAGES.CONTRACTS.E_yel_gry_2} />,
  W_blu_bla_2: <IMG src={IMAGES.CONTRACTS.W_blu_bla_2} />,
  W_blu_bro_2: <IMG src={IMAGES.CONTRACTS.W_blu_bro_2} />,
  W_bro_bla_1: <IMG src={IMAGES.CONTRACTS.W_bro_bla_1} />,
  W_grn_blu_2: <IMG src={IMAGES.CONTRACTS.W_grn_blu_2} />,
  W_grn_bla_1: <IMG src={IMAGES.CONTRACTS.W_grn_bla_1} />,
  W_gry_bla_3: <IMG src={IMAGES.CONTRACTS.W_gry_bla_3} />,
  W_gry_blu_5: <IMG src={IMAGES.CONTRACTS.W_gry_blu_5} />,
  W_gry_bro_3: <IMG src={IMAGES.CONTRACTS.W_gry_bro_3} />,
  W_gry_grn_3: <IMG src={IMAGES.CONTRACTS.W_gry_grn_3} />,
  W_red_blu_2: <IMG src={IMAGES.CONTRACTS.W_red_blu_2} />,
  W_red_bro_1: <IMG src={IMAGES.CONTRACTS.W_red_bro_1} />,
  W_red_grn_1: <IMG src={IMAGES.CONTRACTS.W_red_grn_1} />,
  W_red_gry_3: <IMG src={IMAGES.CONTRACTS.W_red_gry_3} />,
  W_red_yel_2: <IMG src={IMAGES.CONTRACTS.W_red_yel_2} />,
  W_yel_bla_2: <IMG src={IMAGES.CONTRACTS.W_yel_bla_2} />,
  W_yel_blu_3: <IMG src={IMAGES.CONTRACTS.W_yel_blu_3} />,
  W_yel_bro_2: <IMG src={IMAGES.CONTRACTS.W_yel_bro_2} />,
  W_yel_grn_2: <IMG src={IMAGES.CONTRACTS.W_yel_grn_2} />,
  W_yel_gry_5: <IMG src={IMAGES.CONTRACTS.W_yel_gry_5} />,
};

interface IContractProps {
  contract: IContract;
}

const Contract = ({ contract }: IContractProps): JSX.Element => {
  return <>{CONTRACTS[contract.uuid]}</>;
};

export default Contract;
