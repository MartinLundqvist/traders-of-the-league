import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { Button, ButtonSmall, Title } from '../../elements/Typography';
import { CARGO_ARRAY } from '../../utils/cargoColors';
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

interface ILoadProps {
  className: string;
}

const Load = ({ className }: ILoadProps): JSX.Element => {
  const { currentCity, currentPlayer, loadCargo } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const [playerCargo, setPlayerCargo] = useState<TCargo[]>([]);
  const [cityGoods, setCityGoods] = useState<TCargo[]>([]);
  const [cargoLoaded, setCargoLoaded] = useState<TCargo[]>([]);

  useEffect(() => {
    console.log('Load UseEffect: New city or player object received');
    console.log(currentCity);
    currentCity && setCityGoods([...currentCity?.goods]);
    currentPlayer && setPlayerCargo([...currentPlayer?.cargo]);
  }, [currentCity, currentPlayer]);

  const handleLoadCargoClick = (good: TCargo) => {
    console.log('Addding ' + good + ' to the local cargohold');

    const newCityGoods = [...cityGoods];
    const itemIndexToLoad = newCityGoods.findIndex((g) => g === good);
    newCityGoods.splice(itemIndexToLoad, 1);

    setCityGoods(newCityGoods);
    setPlayerCargo((prevCargo) => [...prevCargo, good]);
    setCargoLoaded((prevCargo) => [...prevCargo, good]);
  };

  const handleDoneClick = () => {
    loadCargo(cargoLoaded);
    setActiveActionRoute('none');
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
          <td>Load?</td>
          {CARGO_ARRAY.map((good) => (
            <td>
              <ButtonSmall onClick={() => handleLoadCargoClick(good)}>
                +
              </ButtonSmall>
            </td>
          ))}
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

export default Load;
