import { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export interface INotification {
  uuid: string;
  message: string;
  timeOut?: number; // in milliseconds
}

interface INotificationsContext {
  notifications: INotification[];
  createNotification: (message: string, timeOut?: number) => void;
  removeNotification: (uuid: INotification['uuid']) => void;
}

const NotificationsContext = createContext({} as INotificationsContext);

export const useNotifications = () => useContext(NotificationsContext);

interface INotificationsProviderProps {
  children: React.ReactNode;
}

const DEFAULT_TIMEOUT = 3 * 1000; // 3 seconds

export const NotificationsProvider = ({
  children,
}: INotificationsProviderProps): JSX.Element => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    console.log('Update in NotificationsProvuder!');
    console.log(notifications);
  }, [notifications]);

  const createNotification = (
    message: string,
    timeOut: number = DEFAULT_TIMEOUT
  ) => {
    setNotifications((notifications) => [
      ...notifications,
      { uuid: nanoid(), message, timeOut },
    ]);
  };

  const removeNotification = (uuid: string) => {
    console.log('Removing notification');
    setNotifications((notifications) =>
      [...notifications].filter((notification) => notification.uuid !== uuid)
    );
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, createNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
