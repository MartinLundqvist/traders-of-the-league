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

// const Wrapper = styled.div`
//   position: absolute;
//   display: inline-block;
//   width: 20px;
//   pointer-events: none;
// `;

// const SVG = styled.svg`
//   pointer-events: none;
// `;

// interface IPolygonProps {
//   fill: string;
// }

// const Polygon = styled.polygon<IPolygonProps>`
//   fill: ${(props) => props.fill};
// `;

interface IGoodProps {
  good: TCargo;
  className?: string;
}

const Good = ({ good, className = '' }: IGoodProps): JSX.Element => {
  return <>{CARGO[good]}</>;
};

// const Good = ({ good, className = '' }: IGoodProps): JSX.Element => {
//   return (
//     <Wrapper className={className}>
//       <SVG
//         version='1.1'
//         id='Layer_1'
//         xmlns='http://www.w3.org/2000/svg'
//         xmlnsXlink='http://www.w3.org/1999/xlink'
//         x='0px'
//         y='0px'
//         viewBox='0 0 512 512'
//         xmlSpace='preserve'
//       >
//         <Polygon
//           fill={CARGO_COLOR_STRINGS[good][0]}
//           points='480,112 256,0 32,112 32,400 256,512 480,400 '
//         />
//         <Polygon
//           fill={CARGO_COLOR_STRINGS[good][1]}
//           points='256,224 32,112 32,400 256,512 480,400 480,112 '
//         />
//         <Polygon
//           fill={CARGO_COLOR_STRINGS[good][2]}
//           points='256,224 256,512 480,400 480,112 '
//         />
//       </SVG>
//     </Wrapper>
//   );
// };

export default Good;
