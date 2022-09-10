import styled from 'styled-components';
import url_scroll from '../assets/ui/gui_scroll.png';
import url_scroll_landscape from '../assets/ui/gui_long_scroll.png';
import url_scroll_bug from '../assets/ui/gui_bug_report.png';
import { HEADER, FOOTER } from '../utils/layoutGeometry';

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  padding: ${HEADER / 2}px 0 ${FOOTER / 2}px 0;
  backdrop-filter: blur(3px);

  .scroll-container {
    background-image: url('${url_scroll}');
    background-size: contain;

    &.landscape {
      background-image: url('${url_scroll_landscape}');
      background-size: 100% 100%;
      padding: 0 2rem 0 2rem;
    }

    &.bug-report {
      background-image: url('${url_scroll_bug}');
    }

    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
`;

interface IScrollProps {
  children: React.ReactNode;
  className: string;
  landscape?: boolean;
  bugreport?: boolean;
}

const ScrollFull = ({
  children,
  className,
  landscape = false,
  bugreport = false,
}: IScrollProps): JSX.Element => {
  return (
    <Wrapper className={className}>
      <div
        className={
          'scroll-container' +
          (landscape ? ' landscape' : '') +
          (bugreport ? ' bug-report' : '')
        }
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default ScrollFull;
