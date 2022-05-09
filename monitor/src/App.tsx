import { useEffect, useState } from 'react';

interface ISession {
  uuid: string;
  user: {
    name: string;
    connected: boolean;
  };
}

interface IGame {
  uuid: string;
  name: string;
  status: string;
}

interface IChat {
  uuid: string;
  nrMessages: number;
}

const App = (): JSX.Element => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getData = async () => {
      const url = import.meta.env.VITE_URL;
      console.log(url);

      try {
        const sessionsResults = await fetch(`${url}/sessions`);
        const gamesResults = await fetch(`${url}/games`);
        const chatsResults = await fetch(`${url}/chats`);

        const _sessions = await sessionsResults.json();
        const _chats = await chatsResults.json();
        const _games = await gamesResults.json();

        setSessions(_sessions);
        setGames(_games);
        setChats(_chats);
      } catch (e) {
        console.log('Error');
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <div className='container'>
      <div className='header'>
        <h1>Traders of the Hanseatic League - game server monitor</h1>
      </div>
      <div className='sessions'>
        <h2>Sessions</h2>
        <ul>
          {sessions.map((session) => (
            <li key={session.uuid}>
              {session.user.name} (
              {session.user.connected ? 'connected' : 'not connected'})
            </li>
          ))}
        </ul>
      </div>
      <div className='games'>
        <h2>Games</h2>
        <ul>
          {games.map((game) => (
            <li key={game.uuid}>
              {game.name}: {game.status}
            </li>
          ))}
        </ul>
      </div>
      <div className='chats'>
        <h2>Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.uuid}>
              {games.find((game) => game.uuid === chat.uuid)?.name}:{' '}
              {chat.nrMessages} messages
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
