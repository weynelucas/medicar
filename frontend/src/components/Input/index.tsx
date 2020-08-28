import React, {
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { Container, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, label, onFocus, onBlur, ...rest }, inputRef) => {
    const [active, setActive] = useState(() => {
      if (value) {
        return value.toString().length > 0;
      }

      return false;
    });

    const handleInputFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        setActive(true);

        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus],
    );

    const handleInputBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        setActive(event.target.value.length > 0);

        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur],
    );

    return (
      <Container active={active}>
        <InputContainer
          value={value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
        {label && <label>{label}</label>}
      </Container>
    );
  },
);

export default Input;
