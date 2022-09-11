import { useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import Scroll from '../../elements/Scroll';
import ScrollFull from '../../elements/ScrollFull';
import {
  Title,
  Input,
  TitleSmall,
  ButtonSmall,
} from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .form-container {
    display: flex;
    flex-direction: column;
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
    <ScrollFull className={className}>
      <Container>
        <TitleSmall>This appears to be your first time here!</TitleSmall>
        <div className='form-container'>
          <Title>Choose a trader name</Title>
          <Input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            autoFocus
          />
          <ButtonSmall onClick={() => createSession(name)}>
            Register
          </ButtonSmall>
        </div>
      </Container>
    </ScrollFull>
  );
};

export default Register;
