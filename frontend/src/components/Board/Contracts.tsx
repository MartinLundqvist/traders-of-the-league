import styled from 'styled-components';
import { IContract } from '../../../../shared/types';
import Contract from './Contract';

interface IWrapperProps {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  ${(props) => props.north && 'top: -32px'};
  ${(props) => props.west && 'right: 0px'};
  ${(props) => props.center && 'left: 16px'};
  ${(props) => props.farEast && 'left: -70px'};
  ${(props) => props.farEast && 'top: 0px'};
  pointer-events: auto;

  transition: transform 150ms ease-in-out;

  --color-border: hsla(0, 0%, 0%, 0.5);
  --color-content: hsla(0, 100%, 100%, 0.8);

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
    <Wrapper north={north} west={west} center={center} farEast={farEast}>
      {contracts.map((contract, index) => (
        <Contract contract={contract} key={index} />
      ))}
    </Wrapper>
  );
};

export default Contracts;
