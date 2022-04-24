import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IContract, TCargo } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { Button, ButtonSmall, Title } from '../../elements/Typography';
import { CARGO_ARRAY } from '../../utils/cargoColors';
import Contract from '../Board/Contract';
import Good from '../Board/Good';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: var(--color-fill-sea-opaque);
  backdrop-filter: blur(10px);
  z-index: 10;

  table {
    font-size: 2rem;
    width: 70%;
    height: 50%;

    th,
    td {
      text-align: center;
    }

    td.separator {
      padding-top: 1rem;
    }

    td.vps {
      border-top: 1px solid black;
    }
  }

  .good {
    position: relative;
    width: 3rem;
  }

  .action-container {
    display: flex;
    flex-direction: row;
    gap: 3rem;
  }
`;

interface ITradeProps {
  className: string;
}

const Trade = ({ className }: ITradeProps): JSX.Element => {
  const { currentCity, currentPlayer, makeTrades } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const [playerCargo, setPlayerCargo] = useState<TCargo[]>([]);
  const [cityGoods, setCityGoods] = useState<TCargo[]>([]);
  const [contractsTraded, setContractsTraded] = useState<IContract[]>([]);
  const [vpsEarned, setVpsEarned] = useState(0);

  useEffect(() => {
    console.log('First render');
    console.log(currentCity);
    currentCity && setCityGoods([...currentCity?.goods]);
    currentPlayer && setPlayerCargo([...currentPlayer?.cargo]);
  }, []);

  const handleDoneClick = () => {
    makeTrades(contractsTraded);
    setActiveActionRoute('none');
  };

  const canFulfillContract = (contract: IContract): boolean => {
    const hasCargo = (cargo: TCargo): boolean => {
      return cityGoods.includes(cargo) || playerCargo.includes(cargo);
    };

    return hasCargo(contract.cargo[0]) && hasCargo(contract.cargo[1]);
  };

  const handleTradeClick = (contract: IContract) => {
    const fulfillOneGood = (cargo: TCargo): boolean => {
      // First try and fulfill from the city
      if (cityGoods.includes(cargo)) {
        let itemIndexToLoad = cityGoods.findIndex((g) => g === cargo);
        setCityGoods((prevGoods) => prevGoods.splice(itemIndexToLoad, 1));
        return true;
      }

      // Second try and fulfill from the cargo hold
      if (playerCargo.includes(cargo)) {
        let itemIndexToLoad = playerCargo.findIndex((g) => g === cargo);
        setPlayerCargo((prevCargo) => prevCargo.splice(itemIndexToLoad, 1));
        return true;
      }

      return false;
    };

    // TODO: This is dangerous! Needs testing shooting.
    let success =
      fulfillOneGood(contract.cargo[0]) && fulfillOneGood(contract.cargo[1]);

    setContractsTraded((prevContracts) => [...prevContracts, contract]);

    setVpsEarned((prevVps) => prevVps + contract.value);

    console.log('Contract was fulfilled? ' + success);
  };

  return (
    <Wrapper className={className}>
      <Title>Load cargo from City of {currentCity?.name}</Title>
      <table>
        <tr>
          <th>{}</th>
          {CARGO_ARRAY.map((good) => (
            <th>
              {' '}
              <Good good={good} className='good' />
            </th>
          ))}
          <th></th>
          <th>VPs earned</th>
        </tr>
        <tr>
          <td>Your cargo</td>
          {CARGO_ARRAY.map((good) => (
            <td>{playerCargo.filter((c) => c === good).length || ''}</td>
          ))}
        </tr>
        <tr>
          <td>City goods</td>
          {CARGO_ARRAY.map((good) => (
            <td>{cityGoods.filter((c) => c === good).length || ''}</td>
          ))}
        </tr>
        <tr>
          <td className='separator' />
        </tr>
        {currentCity?.contracts.map((contract, index) => (
          <tr>
            <td>
              Contract {index + 1}:
              <Contract contract={contract} />{' '}
            </td>
            {CARGO_ARRAY.map((good) => (
              <td>{contract.cargo.includes(good) ? '•' : ''}</td>
            ))}
            <td>
              <ButtonSmall
                disabled={!canFulfillContract(contract)}
                onClick={() => handleTradeClick(contract)}
              >
                Trade
              </ButtonSmall>
            </td>
            <td />
          </tr>
        ))}
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td className='vps'>{vpsEarned}</td>
        </tr>
      </table>
      <div className='action-container'>
        <Button warning onClick={() => setActiveActionRoute('none')}>
          Abort
        </Button>
        <Button onClick={() => handleDoneClick()}>Do it</Button>
      </div>
    </Wrapper>
  );
};

export default Trade;
