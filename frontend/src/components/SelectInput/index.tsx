import React, { forwardRef } from 'react';
import { SelectContainer, SelectPlaceholder } from './styles';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options?: SelectOption[];
}

const SelectInput: React.RefForwardingComponent<
  HTMLSelectElement,
  SelectInputProps
> = ({ placeholder, options = [], ...rest }, inputRef) => {
  return (
    <SelectContainer ref={inputRef} {...rest}>
      {placeholder && (
        <SelectPlaceholder value="">{placeholder}</SelectPlaceholder>
      )}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </SelectContainer>
  );
};

export default forwardRef(SelectInput);
