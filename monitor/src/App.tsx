import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { useNavigation } from './contexts/NavigationProvider';
import { ROUTES } from './pages';

const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  background-color: var(--bs-light);
  grid-template-columns: minmax(8rem, 1fr) 5fr;
  grid-template-rows: 5rem auto;
  grid-template-areas:
    'header header'
    'navigation content';

  > div {
    /* padding: 0.5rem; */
    border: 1px solid var(--bs-dark);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .header {
    grid-area: header;
  }

  .navigation {
    grid-area: navigation;
  }

  .content {
    padding-top: 0.5rem;
    grid-area: content;
  }
`;

const App = (): JSX.Element => {
  const { activeRoute } = useNavigation();

  return (
    <Wrapper>
      <div className='header'>
        <Container>
          <Header />
        </Container>
      </div>
      <div className='navigation'>
        <Container>
          <Navigation />
        </Container>
      </div>
      <div className='content'>
        <Container>{ROUTES[activeRoute]}</Container>
      </div>
    </Wrapper>
  );
};

export default App;
