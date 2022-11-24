import { useEffect, useMemo, useRef } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useGames } from '../hooks';
import { citiesEmptied, contractsFulFilled } from '../utils/gameStatistics';

const Statistics = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();

  const cityStats = useMemo(() => {
    return games ? citiesEmptied(games) : [];
  }, [games]);

  const contractStats = useMemo(() => {
    return games ? contractsFulFilled(games) : [];
  }, [games]);

  if (isLoading) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <Row xs={1} md={2} className='g-4'>
        <Col>
          <Card>
            <Card.Header># Times city was emptied</Card.Header>
            <Card.Body>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>City</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {cityStats.map((cityStat) => (
                    <tr key={cityStat.cityName}>
                      <td>{cityStat.cityName}</td>
                      <td>
                        <Badge>{cityStat.nrEmpties}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header># Times contract was fulfilled</Card.Header>
            <Card.Body>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>Contract</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {contractStats.map((contractStat) => (
                    <tr key={contractStat.contractName}>
                      <td>{contractStat.contractName}</td>
                      <td>
                        <Badge>{contractStat.nrFulFilled}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
