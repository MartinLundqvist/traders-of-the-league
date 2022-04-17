import styled from 'styled-components';
import { TCargo } from '../../../../shared/types';
import { CARGO_COLOR_STRINGS } from '../../utils/cargoColors';

const Wrapper = styled.div`
  position: absolute;
  display: inline-block;
  width: 20px;
  pointer-events: none;
`;

const SVG = styled.svg`
  pointer-events: none;
`;

interface IPolygonProps {
  fill: string;
}

const Polygon = styled.polygon<IPolygonProps>`
  fill: ${(props) => props.fill};
`;

interface IGoodProps {
  good: TCargo;
}

const Good = ({ good }: IGoodProps): JSX.Element => {
  return (
    <Wrapper>
      <SVG
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 512 512'
        xmlSpace='preserve'
      >
        <Polygon
          fill={CARGO_COLOR_STRINGS[good][0]}
          points='480,112 256,0 32,112 32,400 256,512 480,400 '
        />
        <Polygon
          fill={CARGO_COLOR_STRINGS[good][1]}
          points='256,224 32,112 32,400 256,512 480,400 480,112 '
        />
        <Polygon
          fill={CARGO_COLOR_STRINGS[good][2]}
          points='256,224 256,512 480,400 480,112 '
        />
      </SVG>
    </Wrapper>
  );
};

export default Good;
