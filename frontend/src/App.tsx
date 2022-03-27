import styled from 'styled-components';
import Board from './components/Board';
import Europe from './elements/Europe';
import { Title } from './elements/Typography';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-areas: 'header header header' 'margin-left game margin-right' 'footer footer footer';
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px auto 100px;

  .header {
    grid-area: header;
  }

  .full {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
`;

function App() {
  return (
    <Wrapper>
      <Europe className='full' />
      <Title className='header'>Traders of the Hanseatic League</Title>
      <Board />
    </Wrapper>
  );
}

export default App;
