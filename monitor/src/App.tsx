import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navigation from './components/Navigation';

const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  padding-right: 1rem;
  padding-left: 1rem;
  background-color: var(--bs-light);
  grid-template-columns: minmax(8rem, 1fr) 5fr;
  grid-template-rows: 5rem auto;
  grid-template-areas:
    'header header'
    'navigation content';

  > div {
    padding: 0.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .header {
    grid-area: header;
    border-bottom: 1px solid var(--bs-dark);
  }

  .navigation {
    grid-area: navigation;
    border-right: 1px solid var(--bs-dark);
  }

  .content {
    padding-top: 0.5rem;
    grid-area: content;
  }
`;

const App = (): JSX.Element => {
  return (
    // <Container>
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
        <Container>
          <Outlet />
        </Container>
      </div>
    </Wrapper>
    // </Container>
  );
};

export default App;
