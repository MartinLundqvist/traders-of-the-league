import styled from 'styled-components';
import scroll from '../assets/ui/gui_player_status_landscape.png';

const Wrapper = styled.div`
  width: 100%;
  max-width: 15rem;
  height: 100%;
  background-image: url('${scroll}');
  background-size: 100% 100%;
  background-position: center;
  background-origin: border-box;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 1rem 0.25rem 1rem;
  font-size: 1.2rem;
  /* border-radius: 0.25rem; */

  /* background-color: var(--color-bg);
  box-shadow: 3px 3px 3px var(--color-bg-shadow); */

  &.pulse {
    animation: pulse 500ms ease-in-out alternate infinite;
  }

  .content {
    font-size: 1.2rem;
  }

  @keyframes pulse {
    to {
      transform: scale(1.1);
    }
  }
`;

interface ICardProps {
  title: string;
  content: string;
  pulse?: boolean;
}

const Card = ({ title, content, pulse = false }: ICardProps): JSX.Element => {
  return (
    <Wrapper className={pulse ? 'pulse' : ''}>
      <div className='title'>{title}</div>
      <div className='content'>{content}</div>
    </Wrapper>
  );
};

export default Card;
