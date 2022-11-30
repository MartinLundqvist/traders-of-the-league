import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ConfirmDelete = (): JSX.Element => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const array = Array.from(query).map((value) => value[0]);

  console.log(array);

  return (
    <Container>
      <Row>
        <Col>Confirm deletion of games:</Col>
      </Row>
      {Array.from(query).map((value, index) => (
        <Row key={value[0]}>
          <Col>Game id: {value[0]}</Col>
        </Row>
      ))}
    </Container>
  );
};

export default ConfirmDelete;
