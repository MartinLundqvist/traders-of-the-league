import Board from '../components/Board';
import Register from '../components/Register';
import NewGame from './../components/NewGame';
import Start from './../components/Start';

export type TRoute = 'register' | 'start' | 'newgame' | 'board';

type TRoutes = {
  [key in TRoute]: JSX.Element;
};

const routes: TRoutes = {
  register: <Register className='grid-area--game' />,
  start: <Start className='grid-area--game' />,
  newgame: <NewGame className='grid-area--game' />,
  board: <Board className='grid-area--game' />,
};

export default routes;
