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
  const { currentCity, myPlayer, makeTrades } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const [playerCargo, setPlayerCargo] = useState<TCargo[]>([]);
  const [cityGoods, setCityGoods] = useState<TCargo[]>([]);
  const [contractsTraded, setContractsTraded] = useState<IContract[]>([]);
  const [vpsEarned, setVpsEarned] = useState(0);

  useEffect(() => {
    console.log('First render');
    console.log(currentCity);
    currentCity && setCityGoods([...currentCity.goods]);
    myPlayer && setPlayerCargo([...myPlayer.cargo]);
  }, []);

  const handleDoneClick = () => {
    makeTrades(contractsTraded);
    setActiveActionRoute('none');
  };

  const canFulfillContract = (contract: IContract): boolean => {
    //First check if the contract has already been traded

    if (contractAlreadyTraded(contract)) return false;

    // Then check if it can be fulfilled

    const hasCargo = (cargo: TCargo): boolean => {
      return cityGoods.includes(cargo) || playerCargo.includes(cargo);
    };

    return hasCargo(contract.cargo[0]) && hasCargo(contract.cargo[1]);
  };

  const contractAlreadyTraded = (contract: IContract): boolean => {
    let tradedContract = contractsTraded.find(
      (contractTraded) => contractTraded.uuid === contract.uuid
    );

    if (tradedContract) return true;

    return false;
  };

  const handleTradeClick = (contract: IContract) => {
    console.log(contract);
    const newCityGoods = [...cityGoods];
    const newPlayerCargo = [...playerCargo];

    const fulfillOneGood = (cargo: TCargo): boolean => {
      // First try and fulfill from the city
      if (newCityGoods.includes(cargo)) {
        let itemIndexToTrade = newCityGoods.findIndex((g) => g === cargo);
        newCityGoods.splice(itemIndexToTrade, 1);
        return true;
      }

      // Second try and fulfill from the cargo hold
      if (playerCargo.includes(cargo)) {
        let itemIndexToTrade = newPlayerCargo.findIndex((g) => g === cargo);
        newPlayerCargo.splice(itemIndexToTrade, 1);
        return true;
      }

      return false;
    };

    // TODO: This is dangerous! Needs testing shooting.
    let success =
      fulfillOneGood(contract.cargo[0]) && fulfillOneGood(contract.cargo[1]);

    if (success) {
      setCityGoods(newCityGoods);
      setPlayerCargo(newPlayerCargo);
      setContractsTraded((prevContracts) => [...prevContracts, contract]);
      setVpsEarned((prevVps) => prevVps + contract.value);
    }

    console.log('Contract was fulfilled? ' + success);
  };

  return (
    <Wrapper className={className}>
      <Title>Load cargo from City of {currentCity?.name}</Title>
      <table>
        <thead>
          <tr>
            <th>{}</th>
            {CARGO_ARRAY.map((good) => (
              <th key={good + 'headline'}>
                {' '}
                <Good good={good} className='good' />
              </th>
            ))}
            <th></th>
            <th>VPs earned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your cargo</td>
            {CARGO_ARRAY.map((good) => (
              <td key={good + 'cargo'}>
                {playerCargo.filter((c) => c === good).length || ''}
              </td>
            ))}
          </tr>
          <tr>
            <td>City goods</td>
            {CARGO_ARRAY.map((good) => (
              <td key={good + 'good'}>
                {cityGoods.filter((c) => c === good).length || ''}
              </td>
            ))}
          </tr>
          <tr>
            <td className='separator' />
          </tr>
          {currentCity?.contracts.map((contract, index) => (
            <tr key={contract.uuid}>
              <td>
                Contract {index + 1}:
                <Contract contract={contract} />{' '}
              </td>
              {CARGO_ARRAY.map((good) => (
                <td key={good + contract.uuid}>
                  {contract.cargo.includes(good) ? '•' : ''}
                </td>
              ))}
              <td>
                <ButtonSmall
                  disabled={!canFulfillContract(contract)}
                  onClick={() => handleTradeClick(contract)}
                >
                  Trade
                </ButtonSmall>
              </td>
              <td>{contract.value}</td>
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
        </tbody>
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
