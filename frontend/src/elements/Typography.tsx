import styled from 'styled-components';

export const Title = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px var(--color-bg-shadow);
`;

export const TitleSmall = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px var(--color-bg-shadow);
`;

export const Stats = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
`;

export const Input = styled.input`
  appearance: none;
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  border-style: none;
  outline: none;
  padding: 0.25rem 1rem 0.25rem 1rem;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  font: inherit;
  font-size: 3rem;
  font-weight: bold;
  background-color: hsla(0, 0%, 60%, 0.3);
  max-height: 4rem;

  &:focus {
    background-color: hsla(0, 0%, 90%, 0.5);
  }
`;

export const InputSmall = styled.input`
  appearance: none;
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  border-style: none;
  outline: none;
  padding: 0.25rem 1rem 0.25rem 1rem;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  font: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: hsla(0, 0%, 60%, 0.3);
  max-height: 2rem;

  &:focus {
    background-color: hsla(0, 0%, 90%, 0.5);
  }
`;

interface IButtonProps {
  warning?: boolean;
}

export const Button = styled.button<IButtonProps>`
  font: inherit;
  font-size: 3rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  background-color: ${(props) =>
    props.warning ? 'var(--color-bg-warning)' : 'var(--color-bg)'};
  padding: 0.25rem 1rem 0.25rem 1rem;
  max-height: 4rem;

  &:hover {
    background-color: var(--color-bg-highlight);
    cursor: pointer;
  }
`;

interface IButtonSmallProps {
  pulse?: boolean;
  warning?: boolean;
}

export const ButtonSmall = styled.button<IButtonSmallProps>`
  font: inherit;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  background-color: ${(props) =>
    props.warning ? 'var(--color-bg-warning)' : 'var(--color-bg)'};
  padding: 0.25rem 1rem 0.25rem 1rem;
  max-height: 2rem;

  ${(props) =>
    props.pulse && 'animation: pulse 500ms ease-in-out alternate infinite;'};

  &:hover {
    background-color: var(--color-bg-highlight);
  }

  @keyframes pulse {
    to {
      transform: scale(1.1);
    }
  }
`;

export const SelectSmall = styled.select`
  font: inherit;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  background-color: var(--color-bg);
  padding: 0.25rem 1rem 0.25rem 1rem;
  max-height: 2rem;
  outline: none;
`;
