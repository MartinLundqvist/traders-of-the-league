import { Col, Container, Row } from 'react-bootstrap';
import CitiesEmptied from './CityiesEmptied';
import ContractsFulfilled from './ContractsFulfilled';

const Statistics = (): JSX.Element => {
  return (
    <Container>
      <Row xs={1} md={2} className='g-4'>
        <Col>
          <CitiesEmptied />
        </Col>
        <Col>
          <ContractsFulfilled />
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
