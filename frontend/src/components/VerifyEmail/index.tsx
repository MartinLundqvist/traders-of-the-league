import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ButtonSmall, Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 25% 25%;
  gap: 2rem;
  text-align: center;
`;

interface ILoginProps {
  className: string;
}

const VerifyEmail = ({ className }: ILoginProps): JSX.Element => {
  const { user } = useAuth0();
  const [resent, setResent] = useState(false);

  const handleClick = async () => {
    console.log(`Requesting new email for ${user?.sub}`);

    if (!user) {
      window.alert('Error, user not registered.');
      return;
    }

    const URL = import.meta.env.VITE_URL;

    try {
      const raw = await fetch(`${URL}/resendemail/${user.sub}`);

      if (raw.ok) {
        const response = await raw.json();
        console.log(response);
        if (response.success) setResent(true);
      }
    } catch (err) {
      window.alert('Error while communicating with identity provider');
      console.log(err);
    }
  };

  return (
    <Wrapper className={className}>
      <Title>
        You need to verify your email address. Check your inbox (and the spam
        folder). Then reload this page.
      </Title>
      <Title>
        If you can't find the email invitation, click the resend button and wait
        for it.
      </Title>
      <ButtonSmall onClick={() => handleClick()} disabled={resent}>
        Resend verification email
      </ButtonSmall>
      {resent && (
        <Title>
          Mail sent. Once you have verified your email, reload this page.
        </Title>
      )}
    </Wrapper>
  );
};

export default VerifyEmail;
