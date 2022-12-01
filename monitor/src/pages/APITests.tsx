import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useAdmin } from '../hooks';

const URL = import.meta.env.VITE_URL;

const Page = (): JSX.Element => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const isAdmin = useAdmin();
  const [result, setResult] = useState('');

  const testAPICall = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${URL}/protected/test`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // const response = await fetch(`${URL}/protected/test`);

      if (response.ok) {
        const result = await response.json();

        setResult(JSON.stringify(result));
      }
    } catch (e) {
      console.error(e);
    }
  };
  const deleteUser = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${URL}/protected/user/auth0|62839e2666516b006f8cc864`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const response = await fetch(`${URL}/protected/test`);

      if (response.ok) {
        const result = await response.json();

        setResult(JSON.stringify(result));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;

  if (!isAuthenticated)
    return <Button onClick={() => loginWithRedirect()}>Log in</Button>;

  return (
    <Container>
      <Button onClick={() => logout()}>Logout</Button>
      <Button onClick={() => testAPICall()}>Make API call</Button>
      <Button onClick={() => deleteUser()}>Delete User</Button>
      <div>{result}</div>
    </Container>
  );
};

export default withAuthenticationRequired(Page);
