import { useState } from 'react';
import styled from 'styled-components';
import { IContract } from '../../../shared/types';

interface IWrapperProps {
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  ${(props) => props.north && 'top: -32px'};
  ${(props) => props.west && 'right: 0px'};
  ${(props) => props.center && 'left: 16px'};
  ${(props) => props.farEast && 'left: -55px'};
  ${(props) => props.farEast && 'top: 0px'};

  transition: transform 150ms ease-in-out;

  &:hover {
    transform: scale(2);
    z-index: 2;
  }

  div {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1.5px solid black;
    border-left: none;
    background-color: white;
    /* margin: 1px; */
    /* z-index: 2; */
  }

  div:nth-child(1) {
    border-left: 1.5px solid black;
  }
`;

interface IContractProps {
  contracts: IContract[];
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
}

const Contracts = ({
  contracts,
  north,
  west,
  center,
  farEast,
}: IContractProps): JSX.Element => {
  return (
    <Wrapper north={north} west={west} center={center} farEast={farEast}>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

export default Contracts;
