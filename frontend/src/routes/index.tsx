import Board from '../components/Board';
import JoinGame from '../components/JoinGame';
import Register from '../components/Register';
import NewGame from './../components/NewGame';
import Start from './../components/Start';
import Won from '../components/Won';
import Achieve from '../components/Achieve';
import Terminated from '../components/Terminated';
import About from '../components/About';
import Report from '../components/Report';
import City from '../components/City';

export type TRoute =
  | 'register'
  | 'start'
  | 'newgame'
  | 'joingame'
  | 'board'
  | 'won'
  | 'terminated';

export type TActionRoute = 'none' | 'achieve' | 'about' | 'report' | 'city';

type TRoutes = {
  [key in TRoute]: JSX.Element;
};

type TActionRoutes = {
  [key in TActionRoute]: JSX.Element;
};

export const routes: TRoutes = {
  register: <Register className='grid-area--all' />,
  start: <Start className='grid-area--all' />,
  newgame: <NewGame className='grid-area--all' />,
  joingame: <JoinGame className='grid-area--all' />,
  board: <Board className='grid-area--game' />,
  won: <Won className='grid-area--all' />,
  terminated: <Terminated className='grid-area--all' />,
};

export const actionRoutes: TActionRoutes = {
  none: <></>,
  achieve: <Achieve className='grid-area--all' />,
  about: <About className='grid-area--all' />,
  report: <Report className='grid-area--all' />,
  city: <City className='grid-area--all' />,
};
