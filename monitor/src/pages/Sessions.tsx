import { Badge, Container, Spinner, Table } from 'react-bootstrap';
import { useSessions } from '../hooks';
import { useState } from 'react';

const Sessions = (): JSX.Element => {
  const { isLoading, error, data: sessions } = useSessions();

  if (isLoading) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>User name</th>
            <th>Connected?</th>
          </tr>
        </thead>
        <tbody>
          {sessions?.map((session, index) => (
            <tr key={session.uuid + index}>
              <td>{session.user.name}</td>
              <td>
                <Badge bg={session.user.connected ? 'success' : 'secondary'}>
                  {session.user.connected ? 'Online' : 'Offline'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Sessions;
