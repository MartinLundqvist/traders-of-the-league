import { useEffect, useMemo, useRef } from 'react';
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useData } from '../contexts/DataProvider';
import { citiesEmptied, contractsFulFilled } from '../utils/gameStatistics';

const Statistics = (): JSX.Element => {
  const { games } = useData();
  const linkref = useRef<HTMLAnchorElement>(null);

  const cityStats = useMemo(() => {
    return citiesEmptied(games);
  }, [games]);

  const contractStats = useMemo(() => {
    return contractsFulFilled(games);
  }, [games]);

  const handleDownloadClick = async () => {
    const url = import.meta.env.VITE_URL;

    try {
      const response = await fetch(`${url}/wongames`);
      if (!response.ok) {
        console.log('Error fetching won games');
      }

      const wonblob = await response.blob();
      const bloburl = window.URL.createObjectURL(new Blob([wonblob]));

      if (linkref && linkref.current) {
        linkref.current.href = bloburl;
        linkref.current.setAttribute('download', 'games.json');
        linkref.current.click();
      }

      console.log(bloburl);
    } catch (err) {
      console.log('Error fetching data ' + JSON.stringify(err));
    }
  };

  return (
    <>
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
      <Row>
        <Button onClick={() => handleDownloadClick()}>
          Fetch Won Games Stats
        </Button>
        <a ref={linkref}></a>
      </Row>
    </>
  );
};

export default Statistics;
