import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TCargo } from '../../../shared/types';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
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
  const [color, setColor] = useState(['']);

  useEffect(() => {
    switch (good) {
      case 'black':
        setColor([
          'hsl(255, 00%, 12%);',
          'hsl(255,00%, 6%);',
          'hsl(255, 00%, 0%);',
        ]);
        break;
      case 'red':
        setColor([
          'hsl(0, 70%, 72%);',
          'hsl(0,70%, 66%);',
          'hsl(0, 70%, 59%);',
        ]);
        break;
      case 'blue':
        setColor([
          'hsl(240, 100%, 72%);',
          'hsl(240, 100%, 66%);',
          'hsl(240, 100%, 59%);',
        ]);
        break;
      case 'yellow':
        setColor([
          'hsl(60, 70%, 72%);',
          'hsl(60,70%, 66%);',
          'hsl(60, 70%, 59%);',
        ]);
        break;
      case 'gray':
        setColor([
          'hsl(60, 0%, 72%);',
          'hsl(60,0%, 66%);',
          'hsl(60, 0%, 59%);',
        ]);
        break;
      case 'brown':
        setColor([
          'hsl(27, 79%, 35%);',
          'hsl(27,79%, 29%);',
          'hsl(27, 79%, 23%);',
        ]);
        break;
      case 'green':
        setColor([
          'hsl(110, 70%, 72%);',
          'hsl(110,70%, 66%);',
          'hsl(110, 70%, 59%);',
        ]);
        break;

      default:
        break;
    }
  }, []);

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
          fill={color[0]}
          points='480,112 256,0 32,112 32,400 256,512 480,400 '
        />
        <Polygon
          fill={color[1]}
          points='256,224 32,112 32,400 256,512 480,400 480,112 '
        />
        <Polygon fill={color[2]} points='256,224 256,512 480,400 480,112 ' />
      </SVG>
    </Wrapper>
  );
};

export default Good;
