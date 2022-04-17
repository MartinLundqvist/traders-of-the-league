import Board from '../components/Board';
import NewGame from './../components/NewGame';
import Start from './../components/Start';

export type TRoute = 'start' | 'newgame' | 'board';

type TRoutes = {
  [key in TRoute]: JSX.Element;
};

const routes: TRoutes = {
  start: <Start className='grid-area--game' />,
  newgame: <NewGame className='grid-area--game' />,
  board: <Board className='grid-area--game' />,
};

export default routes;
