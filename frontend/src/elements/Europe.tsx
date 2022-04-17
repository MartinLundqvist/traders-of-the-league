// import svg from '../assets/Blank_map_of_Europe_cropped.svg';
import jpg from '../assets/hanseatic.jpeg';
import styled from 'styled-components';

const Europe = styled.img`
  content: url('${jpg}');
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px) grayscale(20%);
  z-index: -1;
`;

export default Europe;
