import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICity, IPlayer } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';
import { CARGO_ARRAY } from '../../utils/cargoColors';
import Good from '../Board/Good';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
  z-index: 10;

  table {
    font-size: 2rem;
  }

  .good {
    position: relative;
  }
`;

interface ILoadProps {
  className: string;
}

const Unload = ({ className }: ILoadProps): JSX.Element => {
  const { currentCity, currentPlayer } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>Unload</Title>
      <table>
        <tr>
          <th>Good</th>
          <th>Cargo</th>
          <th>City</th>
          <th>Contract 1</th>
          <th>Contract 1</th>
          <th>Contract 1</th>
        </tr>
        {CARGO_ARRAY.map((good) => (
          <tr>
            <td>
              <Good good={good} className='good' />
            </td>
            <td>{currentPlayer?.cargo.filter((c) => c === good).length}</td>
            <td>{currentCity?.goods.filter((c) => c === good).length}</td>
            <td>
              {currentCity?.contracts[0]?.cargo.filter((c) => c === good)
                .length || 0}
            </td>
            <td>
              {currentCity?.contracts[1]?.cargo.filter((c) => c === good)
                .length || 0}
            </td>
            <td>
              {currentCity?.contracts[2]?.cargo.filter((c) => c === good)
                .length || 0}
            </td>
          </tr>
        ))}
      </table>
    </Wrapper>
  );
};

export default Unload;
