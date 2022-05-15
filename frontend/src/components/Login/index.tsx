import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { Button } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface ILoginProps {
  className: string;
}

const Login = ({ className }: ILoginProps): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper className={className}>
      <Button onClick={() => loginWithRedirect()}>Login to continue</Button>
    </Wrapper>
  );
};

export default Login;
