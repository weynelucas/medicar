import React, { ReactNode, useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { CheckboxInput, CheckMark, Container } from './styles';

interface CheckboxProps {
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
  name?: string;
  value?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  value,
  children,
  name,
  style,
  className,
}) => {
  const [checked, setChecked] = useState(value || false);

  useEffect(() => {
    if (onChange) {
      onChange(checked);
    }
  }, [checked, onChange]);

  return (
    <Container onClick={() => setChecked(!checked)} {...{ style, className }}>
      <CheckboxInput
        value={String(checked)}
        checked={checked}
        name={name}
        onChange={e => setChecked(Boolean(e.target.value))}
      />
      <CheckMark checked={checked}></CheckMark>
      {children}
    </Container>
  );
};

export default Checkbox;
