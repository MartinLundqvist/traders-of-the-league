import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Chat from './components/Chat';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Notifications from './components/Notifications';
import { useLayout } from './contexts/LayoutProvider';
import Europe from './elements/Europe';
import { routes, actionRoutes } from './routes';
import { FOOTER, HEADER, MARGIN } from './utils/layoutGeometry';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-areas: 'header header header' 'margin-left game margin-right' 'footer footer footer';
  grid-template-columns: minmax(${MARGIN}px, auto) 1fr minmax(${MARGIN}px, auto);
  grid-template-rows: ${HEADER}px 1fr ${FOOTER}px;

  .grid-area--header {
    grid-area: header;
  }

  .grid-area--all {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  .grid-area--game {
    grid-area: game;
  }

  .grid-area--footer {
    grid-area: footer;
  }

  .grid-area--margin-left {
    grid-area: margin-left;
  }
`;

const App = (): JSX.Element => {
  const { activeRoute, activeActionRoute } = useLayout();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <Login className='grid-area--all' />;

  return (
    <Wrapper>
      <Europe className='grid-area--all' />
      <Header className='grid-area--header' />
      {routes[activeRoute]}
      {actionRoutes[activeActionRoute]}
      <Footer className='grid-area--footer' />
      <Chat className='grid-area--margin-left' />
      <Notifications className='grid-area--game' />
    </Wrapper>
  );
};

export default App;
