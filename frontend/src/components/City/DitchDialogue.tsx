import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICityGoodsLoadOptionWithUuid, ICityState } from '.';
import { TCargo } from '../../../../shared/types';
import { ButtonSmall, Title, TitleSmall } from '../../elements/Typography';
import Good from '../Board/Good';
import { nanoid } from 'nanoid';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: grid;

  backdrop-filter: blur(10px);

  .container {
    place-self: center;
    width: 90%;
    background-color: var(--color-fill-sea-opaque);
    box-shadow: 0 3px 5px var(--color-bg-shadow);
    padding: 1rem;

    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: repeat(4, auto);
    grid-template-areas:
      'title title title title title'
      'instruction instruction instruction instruction instruction'
      'cubes cubes cubes cubes cubes'
      'actions actions actions actions actions';

    gap: 1rem;

    .container--title {
      place-self: center;
      grid-area: title;
    }
    .container--instruction {
      place-self: center;
      grid-area: instruction;
    }
    .container--cubes {
      grid-area: cubes;
      place-self: center;
      display: flex;
      flex-direction: row;
      gap: 0.2rem;
    }

    .container--actions {
      grid-area: actions;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

interface IGoodButtonProps {
  checked: boolean;
}

const GoodButton = styled.div<IGoodButtonProps>`
  position: relative;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 5px 8px var(--color-bg-shadow);
  border-radius: 10%;
  padding: 0.2rem 0.5rem 0rem 0.5rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 3px var(--color-bg-shadow);
  }

  ${(props) =>
    props.checked &&
    `
    pointer-events: none; 
  
    &::after {
        position: absolute;
        top 0;
        right: 0;
        content: '⚓';
        font-size: 1.5rem;
        transform: translateX(-20%);
    }

    &:hover {
        box-shadow: 0 5px 8px var(--color-bg-shadow);
    }

  `}

  > div {
    position: relative;
    width: 3rem;
  }
`;

interface IPlayerGoodWithUuid {
  good: TCargo;
  uuid: string;
}

interface IDitchDialogueProps {
  open: boolean;
  close: () => void;
  cityState: ICityState;
  attemptedCityGoodsOption: ICityGoodsLoadOptionWithUuid | null;
  ditchCargo: (cargo: TCargo[]) => void;
}

export const DitchDialogue = ({
  open,
  close,
  cityState,
  attemptedCityGoodsOption,
  ditchCargo,
}: IDitchDialogueProps): JSX.Element => {
  const [playerCargoWithUuid, setPlayerCargoWithUuid] = useState<
    IPlayerGoodWithUuid[]
  >([]);
  const [cargoToDitch, setCargoToDitch] = useState<IPlayerGoodWithUuid[]>([]);

  const reset = () => {
    setCargoToDitch([]);
  };

  useEffect(() => {
    reset();
  }, [open]);

  useEffect(() => {
    if (cityState) {
      let newPlayerCargo = cityState.playerCargo.map((good) => ({
        good,
        uuid: nanoid(),
      }));

      setPlayerCargoWithUuid(newPlayerCargo);
    }
  }, [cityState.playerCargo.length]);

  const handleUndoClick = () => {
    reset();
    close();
  };

  const ditchCube = (good: IPlayerGoodWithUuid) => {
    setCargoToDitch((_prevCargo) => [..._prevCargo, good]);
  };

  const hasDitched = (good: IPlayerGoodWithUuid): boolean => {
    // console.log(cargoToDitch);
    if (cargoToDitch.length === 0) return false;
    if (cargoToDitch.find((ditchedGood) => good.uuid === ditchedGood.uuid))
      return true;

    return false;
  };

  const executeDitch = () => {
    console.log('Ditching ' + JSON.stringify(cargoToDitch));
    let cargo = cargoToDitch.map((good) => good.good);
    ditchCargo(cargo);
    close();
  };

  if (!open) return <></>;

  return (
    <Wrapper>
      <div className='container'>
        <Title className='container--title'>Cargo full</Title>
        <TitleSmall className='container--instruction'>
          Click min {attemptedCityGoodsOption?.cargo.length} cube(s) to ditch
        </TitleSmall>
        <div className='container--cubes'>
          {playerCargoWithUuid.map((good, index) => (
            <GoodButton
              className='container--cubes--cube'
              key={good.uuid}
              onClick={() => ditchCube(good)}
              checked={hasDitched(good)}
            >
              <Good good={good.good} />
            </GoodButton>
          ))}
        </div>
        <div className='container--actions'>
          <ButtonSmall onClick={() => executeDitch()}>Ditch</ButtonSmall>
          <ButtonSmall warning onClick={() => handleUndoClick()}>
            Undo
          </ButtonSmall>
        </div>
      </div>
    </Wrapper>
  );
};
