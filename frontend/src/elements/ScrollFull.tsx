import styled from 'styled-components';
import { IMAGES } from '../elements/Images';

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  place-items: center;

  backdrop-filter: blur(3px);

  .scroll-container {
    height: 90%;
    width: 70%;
    background-image: url('${IMAGES.UI.SCROLLS.scroll}');
    /* background-size: contain; */
    padding: 0 5% 0 5%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: grid;
    place-items: center;
    overflow: hidden;

    &.landscape {
      background-image: url('${IMAGES.UI.SCROLLS.scroll_landscape}');
      background-size: 100% 100%;
      padding: 1rem 2rem 1rem 2rem;
    }

    &.bug-report {
      background-image: url('${IMAGES.UI.SCROLLS.scroll_bug}');
    }

    &.achievement {
      background-image: url('${IMAGES.UI.SCROLLS.scroll_achievement}');
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
