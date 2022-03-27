import styled from 'styled-components';
import Board from './components/Board';
import Europe from './elements/Europe';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-areas: 'header header header' 'margin-left game margin-right' 'footer footer footer';
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px auto 100px;

  img {
    position: absolute;
    display: inline;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0% 40%;
    filter: blur(15px);
    z-index: -1;
    overflow: hidden;
  }

  h1 {
    margin: 0;
    padding: 1rem;
    grid-area: header;
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
  }
`;

function App() {
  return (
    <Wrapper>
      <Europe />
      <h1>Traders of the Hanseatic League</h1>
      <Board />
    </Wrapper>
  );
}

export default App;
