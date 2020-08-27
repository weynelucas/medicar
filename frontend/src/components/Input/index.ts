import styled from 'styled-components';
import colors from '../../styles/colors';

const Input = styled.input`
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 13px 8px 12px 8px;

  &:focus {
    border: 1px solid ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray};
  }

  &:disabled {
    background-color: ${colors.grayLight};
    cursor: not-allowed;
  }
`;

export default Input;
