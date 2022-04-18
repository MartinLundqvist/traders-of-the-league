import { useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, Input, Button, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .form-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
`;

interface IRegisterProps {
  className: string;
}

const Register = ({ className }: IRegisterProps): JSX.Element => {
  const [name, setName] = useState('');
  const { createSession } = useGameServer();

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      createSession(name);
    }
  };

  return (
    <Wrapper className={className}>
      <TitleSmall>
        This appears to be your first time connecting from this browser
      </TitleSmall>
      <div className='form-container'>
        <Title>Choose a trader name</Title>
        <Input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
        />
        <Button onClick={() => createSession(name)}>Register</Button>
      </div>
    </Wrapper>
  );
};

export default Register;
