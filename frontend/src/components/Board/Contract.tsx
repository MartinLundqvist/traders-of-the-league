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

interface IContractProps {
  contract: IContract;
}

const Contract = ({ contract }: IContractProps): JSX.Element => {
  return <IMG src={IMAGES.CONTRACTS[contract.uuid]} />;
};

export default Contract;
