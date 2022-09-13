import png from '../assets/map/map.png';
import styled from 'styled-components';

const Europe = styled.img`
  content: url('${png}');
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export default Europe;
