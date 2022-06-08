import { useEffect, useRef, useState } from 'react';

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
  const linkref = useRef<HTMLAnchorElement>(null);

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

  const handleDownloadClick = () => {
    const download = async () => {
      const url = import.meta.env.VITE_URL;

      try {
        const response = await fetch(`${url}/wongames`);
        if (!response.ok) {
          console.log('Error fetching won games');
        }

        const wonblob = await response.blob();
        const bloburl = window.URL.createObjectURL(new Blob([wonblob]));

        if (linkref && linkref.current) {
          linkref.current.href = bloburl;
          linkref.current.setAttribute('download', 'games.json');
          linkref.current.click();
        }

        console.log(bloburl);
      } catch (err) {
        console.log('Error fetching data ' + JSON.stringify(err));
      }
    };

    download();
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>Traders of the Hanseatic League - game server monitor</h1>
      </div>
      <div className='actions'>
        <button onClick={() => handleDownloadClick()}>
          Fetch Won Games Stats
        </button>
        <a ref={linkref}></a>
      </div>
      <div className='sessions'>
        <h2>Sessions</h2>
        <ul>
          {sessions.map((session, index) => (
            <li key={session.uuid + index}>
              {session.user.name} (
              {session.user.connected ? 'connected' : 'not connected'})
            </li>
          ))}
        </ul>
      </div>
      <div className='games'>
        <h2>Games</h2>
        <ul>
          {games.map((game, index) => (
            <li key={game.uuid + index}>
              {game.name}: {game.status}
            </li>
          ))}
        </ul>
      </div>
      <div className='chats'>
        <h2>Chats</h2>
        <ul>
          {chats.map((chat, index) => (
            <li key={chat.uuid + index}>
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
