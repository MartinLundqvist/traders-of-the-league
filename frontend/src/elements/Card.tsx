import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem 1rem 0.25rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.25rem;

  background-color: var(--color-bg);
  box-shadow: 3px 3px 3px var(--color-bg-shadow);

  &.pulse {
    animation: pulse 500ms ease-in-out alternate infinite;
  }

  .content {
    font-size: 1.5rem;
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
