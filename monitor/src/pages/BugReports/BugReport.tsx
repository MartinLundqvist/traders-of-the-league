import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { RenderPriorityBadgeCell } from '../../components/RenderBadgeCell';
import { useBugReports, useMutateBugReport } from '../../hooks';
import { UTCStringToLocalDate } from '../../utils/dateRenderers';

export const BugReport = (): JSX.Element => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { data, error, isLoading } = useBugReports();
  const [showModal, setShowModal] = useState(false);
  const mutateBugReport = useMutateBugReport();

  const date = search.split('?')[1];

  const bugReport = data?.find(
    (bugReport) => (bugReport.date as unknown as string) === date
  );

  const PriorityBadge = () =>
    RenderPriorityBadgeCell(bugReport?.userReport.priority as string);

  const closeModalandConfirmDelete = () => {
    setShowModal(false);
    mutateBugReport.mutate(date);
    navigate('/bugreports');
  };

  if (isLoading) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  if (error) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }
  if (!bugReport) {
    return <Alert variant='danger'>Bug report not found</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            Bug Report from {UTCStringToLocalDate(date)} <PriorityBadge />
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Reporter: {bugReport?.email}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Action</Card.Header>
            <Card.Body>{bugReport.userReport.action}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Expectation</Card.Header>
            <Card.Body>{bugReport.userReport.expectation}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Bug</Card.Header>
            <Card.Body>{bugReport.userReport.bug}</Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='d-flex gap-2 mt-3'>
        <Button onClick={() => navigate('/bugreports')}>Back</Button>
        <Button variant='danger' onClick={() => setShowModal(true)}>
          Remove
        </Button>
      </div>
      <ConfirmModal
        show={showModal}
        handleAbort={() => setShowModal(false)}
        handleConfirm={() => closeModalandConfirmDelete()}
      />
    </Container>
  );
};

const ConfirmModal = ({
  show,
  handleAbort,
  handleConfirm,
}: {
  show: boolean;
  handleAbort: () => void;
  handleConfirm: () => void;
}): JSX.Element => {
  return (
    <Modal show={show} onHide={handleAbort}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this bug report?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleAbort}>
          Abort
        </Button>
        <Button variant='danger' onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
