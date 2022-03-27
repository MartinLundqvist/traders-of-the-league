// import svg from '../assets/Blank_map_of_Europe_cropped.svg';
import jpg from '../assets/hanseatic.jpeg';
import styled from 'styled-components';

const Europe = styled.img`
  /* position: relative; */
  /* display: inline; */
  content: url('${jpg}');
  /* grid-area: game; */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 40%;
  filter: blur(3px) grayscale(20%);
  z-index: -1;
  overflow: hidden;
`;

// const Europe = (): JSX.Element => {
//   return <IMG src={jpg} />;
// };

export default Europe;
