import { createContext, useContext, useEffect, useState } from 'react';
import { IChat, IGame, ISession } from '../../../shared/types';

interface IDataContext {
  sessions: ISession[];
  chats: IChat[];
  games: IGame[];
  serverOnline: boolean;
  hasLoaded: boolean;
  refreshData: () => void;
}

const DataContext = createContext({} as IDataContext);

export const useData = () => useContext(DataContext);

const DataProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [serverOnline, setServerOnline] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const refreshData = () => {
    setHasLoaded(false);
  };

  useEffect(() => {
    const getData = async () => {
      const url = import.meta.env.VITE_URL;
      console.log('Loading data');
      setHasLoaded(false);

      try {
        const sessionsResults = await fetch(`${url}/sessions`);
        const gamesResults = await fetch(`${url}/games`);
        const chatsResults = await fetch(`${url}/chats`);
        const healthCheck = await fetch(`${url}/`);

        const _sessions = await sessionsResults.json();
        const _chats = await chatsResults.json();
        const _games = await gamesResults.json();
        const _serverOnline = await healthCheck.json();

        setSessions(_sessions);
        setGames(_games);
        setChats(_chats);
        setHasLoaded(true);

        _serverOnline.message === 'Ok'
          ? setServerOnline(true)
          : setServerOnline(false);
      } catch (e) {
        console.log('Error');
        console.log(e);
        setHasLoaded(false);
      }
    };

    !hasLoaded && getData();
  }, [hasLoaded]);

  return (
    <DataContext.Provider
      value={{ sessions, games, chats, serverOnline, refreshData, hasLoaded }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
