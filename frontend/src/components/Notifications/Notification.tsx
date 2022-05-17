import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { INotification } from '../../contexts/NotificationsProvider';
import { Title } from '../../elements/Typography';

interface IWrapperProps {
  timeout: number;
}

const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  opacity: 0;

  &.show {
    animation: ${(props) => `come-and-go ${props.timeout}ms ease-in-out`};
  }

  @keyframes come-and-go {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    30% {
      opacity: 1;
      transform: scale(3);
    }
    70% {
      opacity: 1;
      transform: scale(3);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

interface ICustomNotificationProps {
  notification: INotification;
  remove: () => void;
}

const CustomNotification = ({
  notification,
  remove,
}: ICustomNotificationProps): JSX.Element => {
  const [className, setClassName] = useState('');

  useEffect(() => {
    setClassName('show');

    const timerOne = setTimeout(() => setClassName(''), notification.timeOut!);
    const timerTwo = setTimeout(() => remove(), notification.timeOut! + 500);

    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }, []);

  return (
    <Wrapper className={className} timeout={notification.timeOut!}>
      <Title>{notification.message}</Title>
    </Wrapper>
  );
};

export default CustomNotification;
