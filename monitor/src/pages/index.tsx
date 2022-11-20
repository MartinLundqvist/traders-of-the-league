import Games from './Games';
import Main from './Main';
import Players from './Players';
import Rankings from './Rankings';
import Statistics from './Statistics';
import Sessions from './Sessions';
import Chats from './Chats';

export type TRoutes =
  | 'main'
  | 'stats'
  | 'players'
  | 'games'
  | 'rankings'
  | 'chats'
  | 'sessions';

export const ROUTES = {
  main: <Main />,
  stats: <Statistics />,
  players: <Players />,
  games: <Games />,
  rankings: <Rankings />,
  sessions: <Sessions />,
  chats: <Chats />,
};
