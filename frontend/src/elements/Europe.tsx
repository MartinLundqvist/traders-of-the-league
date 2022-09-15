import { IMAGES } from '../elements/Images';
import styled from 'styled-components';

const Europe = styled.img`
  content: url('${IMAGES.UI.MAIN.map}');
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export default Europe;
