import styled from 'styled-components';
import url_scroll from '../assets/ui/gui_scroll.png';
import url_scroll_landscape from '../assets/ui/gui_long_scroll.png';
import url_scroll_bug from '../assets/ui/gui_bug_report.png';
import url_scroll_achievement from '../assets/ui/gui_achievement.png';
import { HEADER, FOOTER } from '../utils/layoutGeometry';

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  /* place-content: center; */
  place-items: center;
  /* display: grid;
  place-items: center; */
  backdrop-filter: blur(3px);

  .scroll-container {
    height: 80%;
    width: 80%;
    background-image: url('${url_scroll}');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: grid;
    place-items: center;
    overflow: hidden;

    // This works for achievements and for Won
    /* width: 80%;
    height: 80%; */

    // This works for city (i.e., nothing)

    /* display: grid; */

    /* flex-direction: column;
    align-items: center;
    justify-content: center; */
    /* gap: 1.5rem; */

    &.landscape {
      background-image: url('${url_scroll_landscape}');
      background-size: 100% 100%;
      padding: 1rem 2rem 1rem 2rem;
    }

    &.bug-report {
      background-image: url('${url_scroll_bug}');
    }

    &.achievement {
      background-image: url('${url_scroll_achievement}');
    }
  }
`;

interface IScrollProps {
  children: React.ReactNode;
  className: string;
  landscape?: boolean;
  bugreport?: boolean;
  achievement?: boolean;
}

const ScrollFull = ({
  children,
  className,
  landscape = false,
  bugreport = false,
  achievement = false,
}: IScrollProps): JSX.Element => {
  return (
    <Wrapper className={className}>
      <div
        className={
          'scroll-container' +
          (landscape ? ' landscape' : '') +
          (bugreport ? ' bug-report' : '') +
          (achievement ? ' achievement' : '')
        }
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default ScrollFull;
