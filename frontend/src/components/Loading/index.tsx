import styled from 'styled-components';
import { Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  animation: loading 750ms ease-in-out alternate infinite;

  @keyframes loading {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

interface ILoadingProps {
  className: string;
}

const Loading = ({ className }: ILoadingProps): JSX.Element => {
  return (
    <Wrapper className={className}>
      <Title>Loading game assets...</Title>
    </Wrapper>
  );
};

export default Loading;
