import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { noSelect } from '../../styles/placeholders';

interface CheckMarkProps {
  checked?: boolean;
}

const checkedStyle = css`
  background-color: ${colors.primary};
  border: 1px solid ${colors.primary};
`;

const uncheckedStyle = css`
  background-color: transparent;
  border: 1px solid ${colors.gray};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray};
  cursor: pointer;
  ${noSelect}

  &:hover {
    div {
      border: 1px solid ${colors.primary};
    }
  }
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const CheckMark = styled.div<CheckMarkProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
  transition: border-color 100ms ease-in-out;
  ${props => (props.checked ? checkedStyle : uncheckedStyle)}
`;
