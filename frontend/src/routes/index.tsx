import Board from '../components/Board';
import JoinGame from '../components/JoinGame';
import Register from '../components/Register';
import NewGame from './../components/NewGame';
import Start from './../components/Start';
import Load from './../components/Load';
import Trade from '../components/Trade';
import Ditch from '../components/Ditch';
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

export type TActionRoute =
  | 'none'
  | 'load'
  | 'trade'
  | 'ditch'
  | 'achieve'
  | 'about'
  | 'report'
  | 'city';

type TRoutes = {
  [key in TRoute]: JSX.Element;
};

type TActionRoutes = {
  [key in TActionRoute]: JSX.Element;
};

export const routes: TRoutes = {
  register: <Register className='grid-area--game' />,
  start: <Start className='grid-area--game' />,
  newgame: <NewGame className='grid-area--game' />,
  joingame: <JoinGame className='grid-area--game' />,
  board: <Board className='grid-area--game' />,
  won: <Won className='grid-area--game' />,
  terminated: <Terminated className='grid-area--game' />,
};

export const actionRoutes: TActionRoutes = {
  none: <></>,
  load: <Load className='grid-area--game' />,
  trade: <Trade className='grid-area--game' />,
  ditch: <Ditch className='grid-area--game' />,
  achieve: <Achieve className='grid-area--all' />,
  about: <About className='grid-area--all' />,
  report: <Report className='grid-area--game' />,
  city: <City className='grid-area--all' />,
};
