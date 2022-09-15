import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';

import { IMAGES } from '../../elements/Images';

const IMG = styled.img`
  max-height: 100%;
  max-width: 100%;

  pointer-events: none;
`;

type TCargoMap = {
  [key in TCargo]: JSX.Element;
};

const CARGO: TCargoMap = {
  black: <IMG src={IMAGES.GOODS.blackCube} />,
  blue: <IMG src={IMAGES.GOODS.blueCube} />,
  brown: <IMG src={IMAGES.GOODS.brownCube} />,
  gray: <IMG src={IMAGES.GOODS.greyCube} />,
  green: <IMG src={IMAGES.GOODS.greenCube} />,
  red: <IMG src={IMAGES.GOODS.redCube} />,
  yellow: <IMG src={IMAGES.GOODS.yellowCube} />,
};

interface IGoodProps {
  good: TCargo;
}

const Good = ({ good }: IGoodProps): JSX.Element => {
  return <>{CARGO[good]}</>;
};

export default Good;
