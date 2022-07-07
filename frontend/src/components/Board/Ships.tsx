// import ship from '../../assets/ship.svg';
import styled from 'styled-components';
import ship_black from '../../assets/ship_black.png';
import ship_blue from '../../assets/ship_blue.png';
import ship_red from '../../assets/ship_red.png';
import ship_green from '../../assets/ship_green.png';
import ship_yellow from '../../assets/ship_yellow.png';
import { useLayout } from '../../contexts/LayoutProvider';
import { SHIP_HEIGHT, SHIP_WIDTH } from '../../utils/shipGeometry';
import Good from './Good';
import { useEffect, useState } from 'react';

const shipElements = {
  black: ship_black,
  blue: ship_blue,
  red: ship_red,
  green: ship_green,
  yellow: ship_yellow,
};

interface IWrapperProps {
  top: number;
  left: number;
  ship_url: string;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
  height: ${SHIP_HEIGHT}px;
  width: ${SHIP_WIDTH}px;
  background-image: ${(props) => `url('${props.ship_url}')`};
  background-size: cover;
  background-position: center;
  transform: rotateZ(-30deg);

  transition: all 350ms ease-in-out;

  /* background-color: gray;
  border-radius: 50% 50% 10% 10%;
  border: 3px solid black; */
  z-index: 4;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 1fr 1fr 1fr 1fr 1fr 20px;

  div:nth-child(1) {
    grid-row: 2 / 3;
  }
  div:nth-child(2) {
    grid-row: 3 / 4;
  }
  div:nth-child(3) {
    grid-row: 4 / 5;
  }
  div:nth-child(4) {
    grid-row: 5 / 6;
  }
  div:nth-child(5) {
    grid-row: 6 / 7;
  }

  &:hover {
    > span.hover {
      opacity: 1;
    }
  }

  span.hover {
    position: absolute;
    top: -50%;
    left: -50%;
    /* width: 10rem;
    height: 4rem; */
    backdrop-filter: blur(5px);
    background-color: var(--color-fill-sea-opaque);
    box-shadow: 3px 3px 3px var(--color-bg-shadow);
    padding: 0.5rem;
    transform: rotateZ(30deg);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    pointer-events: none;

    .container {
      display: grid;
      grid-template-columns: minmax(auto, max-content) minmax(auto, max-content);
      grid-template-rows: 1fr 1fr;
      grid-template-areas: 'captain name' 'cargo goods';
      gap: 0.5rem;

      .captain {
        grid-area: captain;
      }

      .name {
        grid-area: name;
        white-space: nowrap;
      }

      .cargo {
        grid-area: cargo;
      }

      .goods {
        grid-area: goods;
        display: flex;
        width: 100%;

        > * {
          position: relative;
        }
      }
    }
  }

  .me {
    position: absolute;
    opacity: 0;
    width: max-content;
    background-color: var(--color-fill-sea-opaque);
    box-shadow: 0 3px 5px var(--color-bg-shadow);
    padding: 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    transform: rotateZ(30deg);
    transition: opacity 200ms ease-in-out;
    pointer-events: none;

    &.show {
      opacity: 1;
    }

    animation: pulsing 500ms ease-in-out alternate infinite;

    @keyframes pulsing {
      to {
        transform: rotateZ(30deg) scale(1.2);
      }
    }
  }
`;

const Ships = (): JSX.Element => {
  const { shipLayout } = useLayout();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    setShowReminder(false);

    let timeout: NodeJS.Timeout;

    const interval = setInterval(() => {
      setShowReminder(true);
      timeout = setTimeout(() => {
        setShowReminder(false);
      }, 4000);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [shipLayout]);

  return (
    <>
      {shipLayout.map((ship) => (
        <Wrapper
          top={ship.top}
          left={ship.left}
          key={ship.player.user.uuid}
          ship_url={shipElements[ship.player.color]}
        >
          {ship.player.cargo.map((good, index) => (
            <Good good={good} key={ship.player.user.uuid + index} />
          ))}
          <span className='hover'>
            <div className='container'>
              <div className='captain'>Captain</div>
              <div className='name'>{ship.player.user.name}</div>
              <div className='cargo'>Cargo</div>
              <div className='goods'>
                {ship.player.cargo.map((good, index) => (
                  <Good
                    good={good}
                    key={ship.player.user.uuid + 'detail' + index}
                  />
                ))}
              </div>
            </div>
          </span>
          {ship.isMe && ship.isMyTurn && (
            <div className={'me' + (showReminder ? ' show' : '')}>
              <div>Hey captain! Time to make move!</div>
              {ship.isInCity && (
                <div>(Click the city hex to load or trade!)</div>
              )}
            </div>
          )}
        </Wrapper>
      ))}
    </>
  );
};

export default Ships;
