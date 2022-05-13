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

  td.overload {
    color: red;
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

interface IDitchProps {
  className: string;
}

const Ditch = ({ className }: IDitchProps): JSX.Element => {
  const { myPlayer, ditchCargo } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const [playerCargo, setPlayerCargo] = useState<TCargo[]>([]);
  const [cargoDitched, setCargoDitched] = useState<TCargo[]>([]);

  useEffect(() => {
    myPlayer && setPlayerCargo([...myPlayer.cargo]);
  }, [myPlayer]);

  const cargoIsFull = (): boolean => {
    return playerCargo.length > 4;
  };

  const handleDitchCargoClick = (good: TCargo) => {
    console.log('Ditching ' + good + ' from the local cargohold');

    const newCargoHold = [...playerCargo];
    const itemIndexToDitch = newCargoHold.findIndex((g) => g === good);
    newCargoHold.splice(itemIndexToDitch, 1);

    setPlayerCargo(newCargoHold);
    setCargoDitched((prevCargo) => [...prevCargo, good]);
  };

  const handleDoneClick = () => {
    ditchCargo(cargoDitched);
    setActiveActionRoute('none');
  };

  return (
    <Wrapper className={className}>
      <Title>Ditch cargo</Title>
      <table>
        <thead>
          <tr>
            <th>{}</th>
            {CARGO_ARRAY.map((good) => (
              <th>
                {' '}
                <Good good={good} className='good' />
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your cargo</td>
            {CARGO_ARRAY.map((good) => (
              <td>{playerCargo.filter((c) => c === good).length || ''}</td>
            ))}
            <td className={cargoIsFull() ? 'overload' : ''}>
              = {playerCargo.length}
            </td>
          </tr>
          <tr>
            <td>Ditch?</td>
            {CARGO_ARRAY.map((good) => (
              <td>
                <ButtonSmall onClick={() => handleDitchCargoClick(good)}>
                  -
                </ButtonSmall>
              </td>
            ))}
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

export default Ditch;
