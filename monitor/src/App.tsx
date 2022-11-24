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

  .header {
    grid-area: header;
    border-right: none;
    border-bottom: 1px solid var(--bs-dark);
  }

  .navigation {
    grid-area: navigation;
    border-right: 1px solid var(--bs-dark);
    padding-right: 1rem;
  }

  .content {
    padding-top: 0.5rem;
    grid-area: content;
    overflow-y: scroll;
  }
`;

const App = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='header'>
        <Header />
      </div>
      <div className='navigation'>
        <Navigation />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default App;
