import styled from 'styled-components';
import url_scroll from '../assets/ui/gui_scroll.png';
import url_scroll_landscape from '../assets/ui/gui_long_scroll.png';
import { HEADER, FOOTER } from '../utils/layoutGeometry';

const Wrapper = styled.div`
  background-image: url('${url_scroll}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &.landscape {
    background-image: url('${url_scroll_landscape}');
    background-size: 100% 100%;
    padding: 0 2rem 0 2rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 4;
`;

interface IScrollProps {
  children: React.ReactNode;
  className: string;
  landscape?: boolean;
}

const Scroll = ({
  children,
  className,
  landscape = false,
}: IScrollProps): JSX.Element => {
  return (
    <Wrapper className={className + (landscape ? ' landscape' : '')}>
      {children}
    </Wrapper>
  );
};

export default Scroll;
