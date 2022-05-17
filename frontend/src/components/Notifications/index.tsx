import { useEffect } from 'react';
import styled from 'styled-components';
import { useNotifications } from '../../contexts/NotificationsProvider';
import CustomNotification from './Notification';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
`;

interface INotificationsProps {
  className: string;
}

const Notifications = ({ className }: INotificationsProps): JSX.Element => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <Wrapper className={className}>
      {notifications.map((notification) => (
        <CustomNotification
          key={notification.uuid}
          notification={notification}
          remove={() => removeNotification(notification.uuid)}
        />
      ))}
    </Wrapper>
  );
};

export default Notifications;
