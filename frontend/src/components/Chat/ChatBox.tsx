import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IMessage } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { InputSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow: hidden;

  .chat-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 85%;
    width: calc(100% - 2rem);
    overflow-y: scroll;
  }

  .chat-input {
    position: absolute;
    top: 90%;
    /* padding: 0.25rem; */
    width: calc(100% - 2rem);
    height: 10%;

    input {
      position: relative;
      width: 100%;
    }
  }
`;

const ChatBox = (): JSX.Element => {
  const { chat, sendMessage, me } = useGameServer();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // This is to avoid game layout problems while the parent element is animating
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 200);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (key: string) => {
    if (key === 'Enter' && message.length > 0) {
      const newMessage: IMessage = {
        uuid: '',
        from: me,
        message,
      };
      sendMessage(newMessage);

      setMessage('');
    }
  };

  return (
    <Wrapper>
      {open && (
        <>
          <div className='chat-container'>
            {chat.messages.map((message) => (
              <div key={message.uuid}>
                {message.from.name}: {message.message}
              </div>
            ))}
          </div>
          <div className='chat-input'>
            <InputSmall
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e.code)}
              autoFocus
            ></InputSmall>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default ChatBox;