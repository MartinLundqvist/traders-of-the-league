import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IContract, TCargo } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { nanoid } from 'nanoid';

import {
  Button,
  ButtonSmall,
  Title,
  TitleSmall,
} from '../../elements/Typography';
import Contract from '../Board/Contract';
import Good from '../Board/Good';
import { DitchDialogue } from './DitchDialogue';

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;

  .container-main {
    place-self: center;
    position: relative;
    display: grid;
    grid-template-rows: 1fr 1fr 0.5fr auto 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'cityheading cityheading' 'cargo cargo' 'orders orders' 'load trade' 'actions actions';
    justify-items: center;
    align-items: start;
    gap: 1rem;
    padding: 1rem;

    background-color: var(--color-fill-sea-opaque);
    box-shadow: 0 3px 5px var(--color-bg-shadow);
    backdrop-filter: blur(10px);
    z-index: 10;

    .container-main--cityheading {
      grid-area: cityheading;
    }

    .container-main--orders {
      grid-area: orders;
      display: flex;
      gap: 2rem;
      flex-direction: row;
      justify-content: space-between;
    }

    .container-main--cargo {
      grid-area: cargo;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(6, 1fr);
      align-items: center;

      > * {
        position: relative;
        width: 3rem;
      }
    }

    .container-actions--load {
      grid-area: load;
      display: flex;

      flex-direction: column;
      gap: 1rem;
    }

    .container-actions--trade {
      grid-area: trade;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .container-actions--actions {
      grid-area: actions;
      display: flex;
      flex-direction: row;
      gap: 2rem;
    }
  }
`;

interface IActionButtonProps {
  disabled?: boolean;
  checked?: boolean;
}

const ActionButton = styled.div<IActionButtonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 4rem;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 5px 8px var(--color-bg-shadow);
  border-radius: 10%;
  padding: 0.4rem 1rem 0rem 1rem;
  filter: grayscale(90%);
  pointer-events: none;

  ${(props) =>
    !props.disabled &&
    `

    filter: none;
    pointer-events: auto;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 3px var(--color-bg-shadow);
    }
  `}

  ${(props) =>
    props.checked &&
    `
    filter: none;
  
    &::after {
        position: absolute;
        top 0;
        right: 0;
        content: '⚓';
        font-size: 2rem;
        transform: translateX(-20%);
    }

  `}
  

  &.with-size div {
    position: relative;
    width: 3rem;
  }

  &:hover {
    box-shadow: 0 2px 3px var(--color-bg-shadow);
  }
`;

interface ICityProps {
  className: string;
}

export interface ICityState {
  playerCargo: TCargo[];
  cityGoods: TCargo[];

  cargoToDitch: TCargo[];
  cargoToLoad: TCargo[];
  contractsToTrade: IContract[];

  canTrade: boolean;
  canLoad: boolean;
  movesLeft: number;
}

export interface ICityGoodsLoadOptionWithUuid {
  cargo: TCargo[];
  uuid: string;
}

const INITIAL_STATE: ICityState = {
  playerCargo: [],
  cityGoods: [],
  cargoToDitch: [],
  cargoToLoad: [],
  contractsToTrade: [],
  movesLeft: 0,
  canTrade: false,
  canLoad: false,
};

const City = ({ className }: ICityProps): JSX.Element => {
  const { setActiveActionRoute } = useLayout();
  const {
    currentCity,
    myPlayer,
    canTrade,
    canLoad,
    currentRound,
    tradeDitchLoad,
  } = useGameServer();
  const [cityState, setCityState] = useState<ICityState>(INITIAL_STATE);
  const [cityGoodsLoadOptions, setCityGoodsLoadOptions] = useState<
    ICityGoodsLoadOptionWithUuid[]
  >([]);
  const [loadedCityGoodsOption, setLoadedCityGoodsOption] =
    useState<ICityGoodsLoadOptionWithUuid | null>(null);
  const [attemptedCityGoodsOption, setAttemptedCityGoodsOption] =
    useState<ICityGoodsLoadOptionWithUuid | null>(null);
  const [showDitchDialogue, setShowDitchDialogue] = useState(false);

  const resetOrders = () => {
    if (currentCity && myPlayer) {
      setCityState({
        ...INITIAL_STATE,
        playerCargo: [...myPlayer.cargo],
        cityGoods: [...currentCity.goods],
        movesLeft: currentRound.movesLeft,
        canTrade,
        canLoad,
      });
      setLoadedCityGoodsOption(null);
      setAttemptedCityGoodsOption(null);
    }
  };

  const resetCityGoodsLoadOptions = () => {
    if (!currentCity) return;

    let loadOptions: ICityGoodsLoadOptionWithUuid[] = [];

    loadOptions.push({
      cargo: [currentCity.goods[0]],
      uuid: nanoid(),
    });

    if (currentCity.goods[1]) {
      loadOptions.push({
        cargo: [currentCity.goods[1]],
        uuid: nanoid(),
      });
      loadOptions.push({
        cargo: [currentCity.goods[0], currentCity.goods[1]],
        uuid: nanoid(),
      });
    }

    setCityGoodsLoadOptions(loadOptions);
  };

  useEffect(() => {
    resetOrders();
    resetCityGoodsLoadOptions();
  }, [currentCity, myPlayer]);

  useEffect(() => {
    let newMovesLeft = currentRound.movesLeft;
    let newCanTrade = canTrade;
    let newCanLoad = canLoad;

    const hasTraded = cityState.contractsToTrade.length > 0;
    const hasLoaded = cityState.cargoToLoad.length > 0;

    // Did I only have one move left? Then set moves to 0 and make the 'other' move impossible
    if (currentRound.movesLeft === 1) {
      if (hasTraded) {
        console.log('I have made trades');

        // If we only had one move to make, we will make loading impossible
        newMovesLeft = 0;
        newCanLoad = false;
      }

      // Have I loaded?
      if (hasLoaded) {
        console.log('I have loaded cargo');

        // If we only had one move to make, we will make trading impossible
        newMovesLeft = 0;
        newCanTrade = false;
      }
    } else {
      // I had 2 moves left, so only need to update movesLeft accordingly
      if (hasTraded) newMovesLeft -= 1;
      if (hasLoaded) newMovesLeft -= 1;
    }

    setCityState((_prevState) => ({
      ..._prevState,
      movesLeft: newMovesLeft,
      canLoad: newCanLoad,
      canTrade: newCanTrade,
    }));
  }, [cityState.cargoToLoad.length, cityState.contractsToTrade.length]);

  const canFulfillContract = (contract: IContract): boolean => {
    if (!currentCity || !myPlayer || !cityState.canTrade) return false;

    //First check if the contract has already been traded
    if (contractAlreadyTraded(contract)) return false;

    // Then check if player has already traded two contracts
    if (cityState.contractsToTrade.length >= 2) return false;

    // TODO: Refactor to shared util function

    // Then check if it can be fulfilled
    const hasCargo = (cargo: TCargo): boolean => {
      return (
        currentCity.goods.includes(cargo) ||
        cityState.playerCargo.includes(cargo)
      );
    };

    return hasCargo(contract.cargo[0]) && hasCargo(contract.cargo[1]);
  };

  const contractAlreadyTraded = (contract: IContract): boolean => {
    let tradedContract = cityState.contractsToTrade.find(
      (contractTraded) => contractTraded.uuid === contract.uuid
    );

    if (tradedContract) return true;

    return false;
  };

  const handleTradeClick = (contract: IContract) => {
    if (!currentCity) return;

    console.log(contract);
    // const newCityGoods = [...cityGoods];
    const newPlayerCargo = [...cityState.playerCargo];

    const fulfillOneGood = (cargo: TCargo): boolean => {
      // First try and fulfill from the city
      if (currentCity.goods.includes(cargo)) return true;

      // Second try and fulfill from the cargo hold
      if (cityState.playerCargo.includes(cargo)) {
        let itemIndexToTrade = newPlayerCargo.findIndex((g) => g === cargo);
        newPlayerCargo.splice(itemIndexToTrade, 1);
        return true;
      }

      return false;
    };

    // TODO: This is dangerous! Needs testing shooting.
    let success =
      fulfillOneGood(contract.cargo[0]) && fulfillOneGood(contract.cargo[1]);

    if (success) {
      // setCityGoods(newCityGoods);
      let newMovesLeft = 0;
      if (cityState.movesLeft === 2) {
        newMovesLeft = 1;
      }
      setCityState((_state) => ({
        ..._state,
        playerCargo: newPlayerCargo,
        contractsToTrade: [..._state.contractsToTrade, contract],
      }));
    }

    console.log('Contract was fulfilled? ' + success);
  };

  const checkCanLoad = (): boolean => {
    if (!cityState.canLoad) return false;

    if (cityState.cargoToLoad.length > 0) return false;

    return true;
  };

  const handleLoadCargoClick = (loadOption: ICityGoodsLoadOptionWithUuid) => {
    if (!checkCanLoad) return;

    let enoughSpace =
      cityState.playerCargo.length + loadOption.cargo.length <= 5;

    if (!enoughSpace) {
      setAttemptedCityGoodsOption(loadOption);
      setShowDitchDialogue(true);
      return;
    }

    if (enoughSpace) {
      console.log(
        'Adding ' + JSON.stringify(loadOption.cargo) + ' to the local cargohold'
      );

      const newCityGoods = [...cityState.cityGoods];
      loadOption.cargo.forEach((good) => {
        const itemIndexToLoad = newCityGoods.findIndex((g) => g === good);
        newCityGoods.splice(itemIndexToLoad, 1);
      });

      setCityState((_state) => ({
        ..._state,
        cityGoods: newCityGoods,
        playerCargo: [..._state.playerCargo, ...loadOption.cargo],
        cargoToLoad: loadOption.cargo,
      }));

      setLoadedCityGoodsOption(loadOption);
    }
  };

  const ditchCargoFromCargoDialogue = (cargo: TCargo[]) => {
    if (!attemptedCityGoodsOption) return;

    if (
      cityState.playerCargo.length -
        cargo.length +
        attemptedCityGoodsOption.cargo.length <=
      5
    ) {
      let newPlayerCargo: TCargo[] = [...cityState.playerCargo];

      cargo.forEach((good) => {
        let i = newPlayerCargo.findIndex((playerGood) => playerGood === good);
        if (i > -1) newPlayerCargo.splice(i, 1);
      });

      setCityState((_prevState) => ({
        ..._prevState,
        playerCargo: [...newPlayerCargo, ...attemptedCityGoodsOption.cargo],
        cargoToDitch: [...cargo],
        cargoToLoad: attemptedCityGoodsOption.cargo,
      }));

      setLoadedCityGoodsOption(attemptedCityGoodsOption);
      return;
    }

    window.alert('You did not ditch enough cargo!');
  };

  const loadOptionAlreadyPicked = (
    loadOption: ICityGoodsLoadOptionWithUuid
  ): boolean => {
    if (!loadedCityGoodsOption) return false;

    return loadedCityGoodsOption.uuid === loadOption.uuid;
  };

  const executeOrders = () => {
    console.log('You have ' + cityState.movesLeft + ' moves left');
    tradeDitchLoad(
      cityState.contractsToTrade,
      cityState.cargoToDitch,
      cityState.cargoToLoad
    );

    setActiveActionRoute('none');
  };

  return (
    <Wrapper className={className}>
      <div className='container-main'>
        <Title className='container-main--cityheading'>
          Welcome to {currentCity?.name}
        </Title>
        <div className='container-main--cargo'>
          <TitleSmall>Your cargo</TitleSmall>
          {cityState.playerCargo.map((good, index) => (
            <Good good={good} key={good + index} />
          ))}
        </div>
        <TitleSmall className='container-main--orders'>
          <div>What are your orders, captain?</div>
          <div>{cityState.movesLeft} moves left</div>
        </TitleSmall>
        <div className='container-actions--load'>
          <TitleSmall>Load</TitleSmall>
          {cityGoodsLoadOptions.map((loadOption) => (
            <ActionButton
              key={loadOption.uuid}
              className='with-size'
              onClick={() => handleLoadCargoClick(loadOption)}
              disabled={!checkCanLoad()}
              checked={loadOptionAlreadyPicked(loadOption)}
            >
              {loadOption.cargo.map((good, index) => (
                <Good key={good + index + loadOption.uuid} good={good} />
              ))}
            </ActionButton>
          ))}
        </div>
        <div className='container-actions--trade'>
          <TitleSmall>Trade</TitleSmall>
          {currentCity?.contracts.map((contract) => (
            <ActionButton
              key={contract.uuid}
              onClick={() => handleTradeClick(contract)}
              disabled={!canFulfillContract(contract)}
              checked={contractAlreadyTraded(contract)}
            >
              <Contract contract={contract} size={40} />
            </ActionButton>
          ))}
        </div>
        <div className='container-actions--actions'>
          <ButtonSmall warning onClick={() => resetOrders()}>
            Undo orders
          </ButtonSmall>
          <ButtonSmall pulse onClick={() => executeOrders()}>
            Execute orders
          </ButtonSmall>
          <ButtonSmall onClick={() => setActiveActionRoute('none')}>
            Exit to board
          </ButtonSmall>
        </div>
        <DitchDialogue
          open={showDitchDialogue}
          cityState={cityState}
          attemptedCityGoodsOption={attemptedCityGoodsOption}
          ditchCargo={ditchCargoFromCargoDialogue}
          close={() => setShowDitchDialogue(false)}
        />
      </div>
    </Wrapper>
  );
};

export default City;
