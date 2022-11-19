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
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .text-centered {
    text-align: center;
  }

  .padded {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .margin-centered {
    margin: auto;
  }

  table {
    font-size: 1.2rem;
    text-align: left;

    th {
      font-size: 1.5rem;
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
        <div className='text-centered'>
          You need minimum 5 ranked games to appear on the list
        </div>
        <div className='margin-centered'>
          <ButtonSmall onClick={() => setActiveRoute('start')}>
            Back to menu
          </ButtonSmall>
        </div>
      </Container>
    </ScrollFull>
  );
};

export default Rankings;
