import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGameResults } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonSmall, Title } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  table {
    padding: 2rem 0 2rem 0;
    font-size: 2rem;
    width: 70%;
    /* height: 50%; */

    th,
    td {
      text-align: center;
    }
  }
`;

interface IStartProps {
  className: string;
}

const Won = ({ className }: IStartProps): JSX.Element => {
  const { gameResults } = useGameServer();
  const { setActiveRoute } = useLayout();

  if (!gameResults) return <></>;

  return (
    <Wrapper className={className}>
      <Title>GAME OVER</Title>
      <Title>Player ranking</Title>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Victory points</th>
            <th>Contracts fulfilled</th>
          </tr>
        </thead>
        <tbody>
          {gameResults.playerStats.map((player) => (
            <tr key={player.uuid}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.victoryPoints}</td>
              <td>{player.nrContractsFulfilled}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonSmall onClick={() => setActiveRoute('start')}>
        Start over
      </ButtonSmall>
    </Wrapper>
  );
};

export default Won;
