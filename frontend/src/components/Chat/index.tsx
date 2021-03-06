import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { FOOTER, HEADER } from '../../utils/layoutGeometry';
import ChatBox from './ChatBox';

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 2rem - ${FOOTER + HEADER}px);
  width: 2rem;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 3px 5px var(--color-bg-shadow);
  margin: 1rem 0 1rem 0;
  font-size: 1.2rem;
  writing-mode: vertical-lr;
  z-index: 20;
  transition: width 200ms ease-in-out;
  
  .actionarea {
    position: relative;
    cursor: pointer;

    span {
      position: absolute;
      top: 110%;
      left: 10%;
      padding: 0.25rem 0.1rem;
      font-size: 1.1em;
      background-color: var(--color-bg);
      border-radius: 50%;
      animation: pulse 1s linear alternate infinite;
      
      @keyframes pulse {
        from {transform: scale(0.8)}
        to {transform scale(1.2)}
      }
      
    }
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
  const { session, chat } = useGameServer();
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState(className);
  const [readMessages, setReadMessages] = useState(0);

  useEffect(() => {
    setClasses(`${className} ${open ? 'open' : ''}`);
    open && setReadMessages(chat.messages.length);
  }, [open, chat]);

  if (session.activeGameUuid === '') return <></>;

  return (
    <Wrapper className={classes}>
      <div className='actionarea' onClick={() => setOpen((open) => !open)}>
        {open ? 'Close' : 'Open'} Chat{' '}
        {chat.messages.length > readMessages && <span>!</span>}
      </div>
      {open && <ChatBox />}
    </Wrapper>
  );
};

export default Chat;
