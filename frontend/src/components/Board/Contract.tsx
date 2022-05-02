import styled from 'styled-components';
import { IContract } from '../../../../shared/types';
import { CONTRACT_HEIGHT } from '../../utils/boardGeometry';
import { CARGO_COLOR_STRINGS } from '../../utils/cargoColors';
import { valueClipPaths } from '../../utils/valueClipPaths';

interface IWrapperProps {
  contract: IContract;
}

const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  display: inline-block;
  width: ${CONTRACT_HEIGHT}px; // Square...
  height: ${CONTRACT_HEIGHT}px;
  margin-right: 2px;
  border: 1.5px solid var(--color-border);
  background-color: var(--color-content);
  font-family: 'Roboto';

  .color-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    .left-color {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        CARGO_COLOR_STRINGS[props.contract.cargo[0]][0]};
      font-size: 0.4rem;
      color: white;
    }
    .right-color {
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        CARGO_COLOR_STRINGS[props.contract.cargo[1]][0]};
    }
  }

  .value-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .value {
      width: 70%;
      height: 70%;
      font-size: 0.8rem;
      text-align: center;
      clip-path: ${(props) => valueClipPaths[props.contract.value]};

      background-color: white;
    }
  }
`;

interface IContractProps {
  contract: IContract;
}

const Contract = ({ contract }: IContractProps): JSX.Element => {
  return (
    <Wrapper contract={contract}>
      <div className='color-container'>
        <div className='left-color'>{contract.region[0]}</div>
        <div className='right-color'></div>
      </div>
      <div className='value-container'>
        <div className='value'>{contract.value}</div>
      </div>
    </Wrapper>
  );
};

export default Contract;
