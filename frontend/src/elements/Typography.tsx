import styled from 'styled-components';

export const Title = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: normal;
  text-shadow: 3px 3px 3px var(--color-bg-shadow);
`;

export const TitleButton = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: normal;
  text-shadow: 3px 3px 3px var(--color-bg-shadow);

  transition: all 200ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translate(-5px, -5px);
    text-shadow: 8px 8px 3px var(--color-bg-shadow);
  }
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
    props.pulse &&
    'animation: button_pulse 500ms ease-in-out alternate infinite;'};

  &:hover {
    background-color: var(--color-bg-highlight);
    cursor: pointer;
  }

  @keyframes button_pulse {
    to {
      transform: scale(1.2);
    }
  }
`;

interface IButtonWithImageProps {
  image_url: string;
}

const ButtonWithImage = styled.button<IButtonWithImageProps>`
  border: none;
  background-color: transparent;
  background-image: url('${(props) => props.image_url}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 5rem;
  height: 4rem;
  transition: transform 200ms ease-in-out;
  font: inherit;

  &:disabled {
    filter: grayscale(100%);
  }

  .tooltip-text {
    width: max-content;
    visibility: hidden;
    position: relative;
    top: -2.5rem;
    text-shadow: 3px 3px 3px var(--color-bg-shadow);
  }

  &:hover:enabled {
    transform: scale(1.1);
    cursor: pointer;

    .tooltip-text {
      visibility: visible;
    }
  }
`;

interface IButtonImageProps {
  image_url: string;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonImage = ({
  image_url,
  tooltip = '',
  onClick = () => {},
  disabled = false,
}: IButtonImageProps): JSX.Element => {
  return (
    <ButtonWithImage
      image_url={image_url}
      onClick={onClick}
      disabled={disabled}
    >
      <div className='tooltip-text'>{tooltip}</div>
    </ButtonWithImage>
  );
};

// export const SelectSmall = styled.select`
//   font: inherit;
//   font-size: 1.2rem;
//   border-radius: 0.5rem;
//   border-style: none;
//   box-shadow: 3px 3px 3px var(--color-bg-shadow);
//   background-color: var(--color-bg);
//   padding: 0.25rem 1rem 0.25rem 1rem;
//   max-height: 2rem;
//   outline: none;

//   &:hover {
//     background-color: var(--color-bg-highlight);
//     cursor: pointer;
//   }
// `;

interface ISelectProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  children: React.ReactNode;
}

const SelectSmallWrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9em;
    select {
      font: inherit;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      border-style: none;
      box-shadow: 3px 3px 3px var(--color-bg-shadow);
      background-color: var(--color-bg);
      padding: 0.25rem 1rem 0.25rem 1rem;
      max-height: 2rem;
      outline: none;

      &:hover {
        background-color: var(--color-bg-highlight);
        cursor: pointer;
      }
    }
  }
`;

export const SelectSmall = ({
  value,
  onChange,
  label = undefined,
  children,
}: ISelectProps): JSX.Element => {
  return (
    <SelectSmallWrapper>
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {children}
        </select>
      </label>
    </SelectSmallWrapper>
  );
};

export const Select = styled.select`
  font: inherit;
  font-size: 3rem;
  border-radius: 0.5rem;
  border-style: none;
  box-shadow: 3px 3px 3px var(--color-bg-shadow);
  background-color: var(--color-bg);
  padding: 0.25rem 1rem 0.25rem 1rem;
  outline: none;

  &:hover {
    background-color: var(--color-bg-highlight);
    cursor: pointer;
  }
`;

interface ICheckBoxProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxWrapper = styled.div`
  label {
    position: relative;
    display: block;
    padding-left: 1.5rem;
    cursor: pointer;
    font-size: 1rem;

    input {
      appearance: none;
      position: absolute;
      margin: 0;
      display: grid;
      place-content: center;
      top: 0;
      left: 0;
      height: 1rem;
      width: 1rem;
      border-radius: 3px;
      box-shadow: 3px 3px 3px var(--color-bg-shadow);
      background-color: var(--color-bg);

      &:hover {
        background-color: var(--color-bg-highlight);
        cursor: pointer;
      }

      &:checked::before {
        transform: scale(1);
      }

      &::before {
        content: '';
        width: 1em;
        height: 1.1em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        transform-origin: bottom left;
        background-color: black;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }
    }
  }
`;

export const CheckBox = ({
  id,
  onChange,
  label,
}: ICheckBoxProps): JSX.Element => {
  return (
    <CheckBoxWrapper>
      <label htmlFor={id}>
        {label}
        <input type='checkbox' id={id} onChange={onChange}></input>
        {/* <span className='checkmark' /> */}
      </label>
    </CheckBoxWrapper>
  );
};

interface IDividerProps {
  landscape?: boolean;
}

export const Divider = styled.div<IDividerProps>`
  height: ${(props) => (props.landscape ? '1px' : '2.5rem')};
  width: ${(props) => (props.landscape ? '100%' : '1px')};
  background-color: var(--color-bg-shadow);
`;
