import styled from 'styled-components';
import Footer from './components/Footer';
import { useGame } from './contexts/GameProvider';
import Europe from './elements/Europe';
import { Title } from './elements/Typography';
import routes from './routes';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-areas: 'header header header' 'margin-left game margin-right' 'footer footer footer';
  grid-template-columns: minmax(100px, 1fr) 1fr minmax(100px, 1fr);
  grid-template-rows: 120px 1fr minmax(100px, 1fr);

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
`;

function App() {
  const { activeRoute } = useGame();
  return (
    <Wrapper>
      <Europe className='grid-area--all' />
      <Title className='grid-area--header'>
        Traders of the Hanseatic League
      </Title>
      {routes[activeRoute]}
      <Footer className='grid-area--footer' />
    </Wrapper>
  );
}

export default App;
