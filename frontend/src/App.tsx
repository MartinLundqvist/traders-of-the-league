import styled from 'styled-components';
import Chat from './components/Chat';
import Footer from './components/Footer';
import Header from './components/Header';
import { useLayout } from './contexts/LayoutProvider';
import Europe from './elements/Europe';
import { routes, actionRoutes } from './routes';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-areas: 'header header header' 'margin-left game margin-right' 'footer footer footer';
  grid-template-columns: minmax(100px, auto) 1fr minmax(100px, auto);
  grid-template-rows: 100px 1fr 120px;

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

function App() {
  const { activeRoute, activeActionRoute } = useLayout();
  return (
    <Wrapper>
      <Europe className='grid-area--all' />
      <Header className='grid-area--header' />
      {routes[activeRoute]}
      {actionRoutes[activeActionRoute]}
      <Footer className='grid-area--footer' />
      <Chat className='grid-area--margin-left' />
    </Wrapper>
  );
}

export default App;
