import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';

import blackCube from '../../assets/cubes/Black_Cube.png';
import blueCube from '../../assets/cubes/Blue_Cube.png';
import brownCube from '../../assets/cubes/Brown_Cube.png';
import greenCube from '../../assets/cubes/Green_Cube.png';
import greyCube from '../../assets/cubes/Grey_Cube.png';
import redCube from '../../assets/cubes/Red_Cube.png';
import yellowCube from '../../assets/cubes/Yellow_Cube.png';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;

  pointer-events: none;
`;

type TCargoMap = {
  [key in TCargo]: JSX.Element;
};

const CARGO: TCargoMap = {
  black: <IMG src={blackCube} />,
  blue: <IMG src={blueCube} />,
  brown: <IMG src={brownCube} />,
  gray: <IMG src={greyCube} />,
  green: <IMG src={greenCube} />,
  red: <IMG src={redCube} />,
  yellow: <IMG src={yellowCube} />,
};

interface IGoodProps {
  good: TCargo;
}

const Good = ({ good }: IGoodProps): JSX.Element => {
  return <>{CARGO[good]}</>;
};

export default Good;
