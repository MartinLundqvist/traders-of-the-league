import { Badge, Col, Container, Row } from 'react-bootstrap';
import { useAdmin } from '../hooks';

const Header = (): JSX.Element => {
  const isAdmin = useAdmin();
  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Traders of the Hanseatic League - Game Administration Console</h2>
        {isAdmin && <Badge>Administrator</Badge>}
      </div>
    </Container>
  );
};

export default Header;
