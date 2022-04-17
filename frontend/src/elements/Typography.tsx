import styled from 'styled-components';

export const Title = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 1rem;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
`;

export const TitleSmall = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
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
  box-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
  font: inherit;
  font-size: 3rem;
  font-weight: bold;
  background-color: hsla(0, 0%, 60%, 0.3);

  &:focus {
    background-color: hsla(0, 0%, 90%, 0.5);
  }
`;

export const Button = styled.button`
  font: inherit;
  font-size: 3rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
  background-color: var(--color-bg);
  padding: 0.25rem 1rem 0.25rem 1rem;

  &:hover {
    background-color: var(--color-bg-highlight);
  }
`;
export const ButtonSmall = styled.button`
  font: inherit;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px hsla(57, 145%, 30%, 0.6);
  background-color: var(--color-bg);
  padding: 0.25rem 1rem 0.25rem 1rem;

  &:hover {
    background-color: var(--color-bg-highlight);
  }
`;
