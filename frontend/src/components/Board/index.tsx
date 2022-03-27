import styled from 'styled-components';
import Hex from './Hex';
import { BOARD_LAYOUT } from '../../utils/board-layout';
import { useEffect, useMemo, useState } from 'react';
import { IContract } from '../../../../shared/types';
import { createNewContracts } from '../../../../shared/utils/createNewContracts';
import { pickContractByRegion } from '../../../../shared/utils/pickContractByRegion';

const HEX_MAX_DIAMETER = 110;
const HEX_MIN_DIAMETER = (HEX_MAX_DIAMETER * Math.sqrt(3)) / 2;
const HEX_SIDE_LENGTH = HEX_MAX_DIAMETER / Math.sqrt(3);
const HEX_TOP_OFFSET = HEX_MIN_DIAMETER - 2;
const HEX_LEFT_OFFSET = (HEX_MAX_DIAMETER + HEX_SIDE_LENGTH) / 2 - 6;

console.log('Side length: ' + HEX_SIDE_LENGTH);
console.log('Min diameter: ' + HEX_MIN_DIAMETER);
console.log('Max diameter: ' + HEX_MAX_DIAMETER);
console.log('Number of hexes: ' + BOARD_LAYOUT.length);

const Wrapper = styled.div`
  position: relative;
  grid-area: game;
  place-self: center;
  width: ${12 * HEX_LEFT_OFFSET + HEX_SIDE_LENGTH / 2}px;
  height: ${5 * HEX_MIN_DIAMETER}px;
`;

// const Hexagons = BOARD_LAYOUT.map((hex, index) => (
//   <Hex
//     id={index}
//     left={`${hex.column * HEX_LEFT_OFFSET}px`}
//     top={`${(hex.row * HEX_TOP_OFFSET) / 2}px`}
//     height={`${HEX_MIN_DIAMETER}px`}
//     width={`${HEX_MAX_DIAMETER}px`}
//     city={hex.city}
//     key={index}
//     north={hex.north}
//     west={hex.west}
//     center={hex.center}
//     farEast={hex.farEast}
//   />
// ));

const Board = (): JSX.Element => {
  const [contracts, setContracts] = useState<IContract[] | null>(null);
  const [dealContracts, setDealContracts] = useState(false);
  const [renderBoard, setRenderBoard] = useState(false);

  const Hexagons = useMemo(
    () =>
      BOARD_LAYOUT.map((hex, index) => (
        <Hex
          id={index}
          left={`${hex.column * HEX_LEFT_OFFSET}px`}
          top={`${(hex.row * HEX_TOP_OFFSET) / 2}px`}
          height={`${HEX_MIN_DIAMETER}px`}
          width={`${HEX_MAX_DIAMETER}px`}
          city={hex.city}
          key={index}
          north={hex.north}
          west={hex.west}
          center={hex.center}
          farEast={hex.farEast}
        />
      )),
    [renderBoard]
  );

  useEffect(() => {
    setContracts(createNewContracts());
    setDealContracts(true);
  }, []);

  useEffect(() => {
    const deal = () => {
      if (!contracts) return;
      let localContracts = [...contracts];
      BOARD_LAYOUT.forEach((element) => {
        if (element.city) {
          let pickedContracts = [];
          pickedContracts.push(
            pickContractByRegion(localContracts, element.city.region)
          );
          pickedContracts.push(
            pickContractByRegion(localContracts, element.city.region)
          );
          pickedContracts.push(
            pickContractByRegion(localContracts, element.city.region)
          );
          element.city.contracts = pickedContracts;
        }
      });
      setContracts(localContracts);
      // console.log(BOARD_LAYOUT);
      setDealContracts(false);
      setRenderBoard(true);
    };

    contracts && dealContracts && deal();
  }, [contracts, dealContracts]);

  return <Wrapper>{Hexagons}</Wrapper>;
};

export default Board;
