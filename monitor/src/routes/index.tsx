import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import APITests from '../pages/APITests';
import Chats from '../pages/Chats';
import Games from '../pages/Games';
import GamesConfirmDelete from '../pages/Games/ConfirmDelete';
import PlayersConfirmDelete from '../pages/Players/ConfirmDelete';
import Main from '../pages/Main';
import Players from '../pages/Players';
import Rankings from '../pages/Rankings';
import Sessions from '../pages/Sessions';
import Statistics from '../pages/Statistics';
import BugReports from '../pages/BugReports';
import { BugReport } from '../pages/BugReports/BugReport';

export const createRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: '/home',
          element: <Main />,
        },
        {
          path: '/bugreports',
          element: <BugReports />,
        },
        {
          path: '/bugreports/report',
          element: <BugReport />,
        },
        {
          path: '/chats',
          element: <Chats />,
        },
        {
          path: '/games',
          element: <Games />,
        },
        {
          path: '/games/confirmdelete',
          element: <GamesConfirmDelete />,
        },

        {
          path: '/players',
          element: <Players />,
        },
        {
          path: '/players/confirmdelete',
          element: <PlayersConfirmDelete />,
        },
        {
          path: '/rankings',
          element: <Rankings />,
        },
        {
          path: '/sessions',
          element: <Sessions />,
        },
        {
          path: '/statistics',
          element: <Statistics />,
        },
        {
          path: '/apitests',
          element: <APITests />,
        },
      ],
    },
  ]);

  return router;
};
