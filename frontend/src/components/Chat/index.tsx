import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 2rem);
  width: 2rem;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 3px 5px var(--color-bg-shadow);
  margin: 1rem 0 1rem 0;
  font-size: 1.2rem;
  writing-mode: vertical-lr;
  z-index: 20;
  transition: width 200ms ease-in-out;

  span {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--color-fill-sea);
  }

  &.open {
    width: 20rem;

    justify-content: flex-start;
    writing-mode: horizontal-tb;
    padding: 1rem;
  }
`;

interface IChatProps {
  className: string;
}

const Chat = ({ className = '' }: IChatProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState(className);

  useEffect(() => {
    setClasses(`${className} ${open ? 'open' : ''}`);
  }, [open]);

  return (
    <Wrapper className={classes}>
      <div>
        <span onClick={() => setOpen((open) => !open)}>
          {open ? 'Close' : 'Open'}{' '}
        </span>
        Chat
      </div>
      {open && <ChatBox />}
    </Wrapper>
  );
};

export default Chat;
