import Board from '../components/Board';
import JoinGame from '../components/JoinGame';
import Register from '../components/Register';
import NewGame from './../components/NewGame';
import Start from './../components/Start';
import Load from './../components/Load';
import Trade from '../components/Trade';
import Ditch from '../components/Ditch';
import Won from '../components/Won';

export type TRoute =
  | 'register'
  | 'start'
  | 'newgame'
  | 'joingame'
  | 'board'
  | 'won';

export type TActionRoute = 'none' | 'load' | 'trade' | 'ditch';

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
};

export const actionRoutes: TActionRoutes = {
  none: <></>,
  load: <Load className='grid-area--game' />,
  trade: <Trade className='grid-area--game'></Trade>,
  ditch: <Ditch className='grid-area--game'></Ditch>,
};
