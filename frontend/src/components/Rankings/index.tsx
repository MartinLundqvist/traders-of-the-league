import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IRanking } from '../../../../shared/types';
import { useLayout } from '../../contexts/LayoutProvider';
import ScrollFull from '../../elements/ScrollFull';
import { ButtonSmall, Title } from '../../elements/Typography';

const URL = import.meta.env.VITE_URL;

const Container = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
  gap: 0.5rem;
  overflow: hidden;

  .text-centered {
    text-align: center;
  }

  .divider {
    height: 1px;
    width: 100%;
    background-color: var(--color-background-dark);
  }

  .padded {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .table-container {
    position: relative;
    width: 100%;
    height: 65%;
    overflow-y: scroll;

    table {
      position: relative;
      width: 100%;
      font-size: 1.2rem;
      text-align: left;

      th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: left;

        font-size: 1.5rem;
        border: none;
      }

      td {
        border: none;
        padding: 0.5rem;
      }
    }
  }
`;

interface IRankingsProps {
  className: string;
}

const Rankings = ({ className }: IRankingsProps): JSX.Element => {
  const [ranked, setRanked] = useState<IRanking[] | null>(null);
  const [unRanked, setUnRanked] = useState<IRanking[] | null>(null);
  const { setActiveRoute } = useLayout();

  useEffect(() => {
    const loadRankings = async () => {
      try {
        const raw = await fetch(`${URL}/playerrankings`);

        if (raw.ok) {
          const response: IRanking[] = await raw.json();
          const _ranked: IRanking[] = [];
          const _unRanked: IRanking[] = [];
          for (const ranking of response) {
            if (ranking.rankingHistory.length > 4) _ranked.push(ranking);
            if (ranking.rankingHistory.length < 5) _unRanked.push(ranking);
          }

          setRanked(_ranked);
          setUnRanked(_unRanked);
        }
      } catch (err) {
        window.alert('Error while communicating with ranking server');
        console.log(err);
      }
    };

    loadRankings();
  }, []);

  return (
    <ScrollFull landscape className={className}>
      <Container>
        <Title className='text-centered'>Rankings</Title>
        <div className='divider' />
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Games</th>
                <th>Ranking</th>
              </tr>
            </thead>
            <tbody>
              {ranked?.map((ranking, index) => (
                <tr key={ranking.user.uuid}>
                  <td>{ranking.user.name}</td>
                  <td>{ranking.rankingHistory.length}</td>
                  <td>{ranking.currentRanking}</td>
                </tr>
              ))}
              <tr>
                <td className='text-centered padded' colSpan={3}>
                  Unranked players:
                </td>
              </tr>
              {unRanked?.map((ranking, index) => (
                <tr key={ranking.user.uuid}>
                  <td>{ranking.user.name}</td>
                  <td>{ranking.rankingHistory.length}</td>
                  <td>N/A</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='divider' />
        <div className='text-centered'>
          You need minimum 5 ranked games to appear on the list
        </div>

        <ButtonSmall onClick={() => setActiveRoute('start')}>
          Back to menu
        </ButtonSmall>
      </Container>
    </ScrollFull>
  );
};

export default Rankings;
