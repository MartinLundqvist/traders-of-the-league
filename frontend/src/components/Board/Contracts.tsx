import styled from 'styled-components';
import { IContract } from '../../../../shared/types';
import Contract from './Contract';

interface IWrapperProps {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  nrContracts: number;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  display: grid;
  --columns: ${(props) => (props.nrContracts > 3 ? 4 : 3)};
  /* --columns: 4; */
  width: calc(2 * var(--R));
  grid-template-columns: repeat(var(--columns), calc(var(--R) / 2));
  grid-template-rows: calc(var(--R) / 2);
  ${(props) => props.north && 'justify-content: center; top: -30%'};
  ${(props) => props.west && 'justify-content: flex-end'};
  ${(props) => props.center && 'justify-content: center'};
  ${(props) => props.farEast && 'top: 5%; left: -80%'};

  pointer-events: auto;
  transition: transform 150ms ease-in-out;

  &:hover {
    transform: scale(2);
    z-index: 5;
  }
`;

interface IContractProps {
  contracts: IContract[];
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

const Contracts = ({
  contracts,
  north,
  west,
  center,
  farEast,
}: IContractProps): JSX.Element => {
  return (
    <Wrapper
      north={north}
      west={west}
      center={center}
      farEast={farEast}
      nrContracts={contracts.length}
    >
      {contracts.map((contract, index) => (
        <Contract contract={contract} key={index} />
      ))}
    </Wrapper>
  );
};

export default Contracts;
