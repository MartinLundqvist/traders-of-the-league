import styled from 'styled-components';
import { TCargo } from '../../../../../shared/types';
import { CARGO_COLOR_STRINGS } from '../../../utils/cargoColors';

interface IColoredDivProps {
  color: TCargo;
}

export const ColoredDiv = styled.div<IColoredDivProps>`
  display: inline-block;
  height: 100%;
  width: 50%;
  border: 1px solid hsla(0, 0%, 0%, 0.8);
  background-color: ${(props) => CARGO_COLOR_STRINGS[props.color][2]};
`;

export const EmptyDiv = styled.div`
  display: inline-block;
  height: 100%;
  width: 50%;
  border: 1px solid hsla(0, 0%, 0%, 0.8);
  background-color: white;
`;
export const AnyDiv = styled.div`
  display: inline-block;
  height: 100%;
  width: 50%;
  border: 1px solid hsla(0, 0%, 0%, 0.8);
  background-color: gray;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.5) 2px,
    rgba(255, 255, 255, 0.5) 4px
  );
`;
