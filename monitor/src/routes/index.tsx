import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import APITests from '../pages/APITests';
import Chats from '../pages/Chats';
import Games from '../pages/Games';
import ConfirmDelete from '../pages/Games/ConfirmDelete';
import Main from '../pages/Main';
import Players from '../pages/Players';
import Rankings from '../pages/Rankings';
import Sessions from '../pages/Sessions';
import Statistics from '../pages/Statistics';

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
          path: '/chats',
          element: <Chats />,
        },
        {
          path: '/games',
          element: <Games />,
        },
        {
          path: '/games/confirmdelete',
          element: <ConfirmDelete />,
        },

        {
          path: '/players',
          element: <Players />,
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
