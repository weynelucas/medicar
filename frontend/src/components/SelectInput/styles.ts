import styled from 'styled-components';
import colors from '../../styles/colors';

export const SelectContainer = styled.select`
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 15px 8px;
  color: ${colors.black};

  &:disabled {
    background-color: ${colors.grayLight};
    cursor: not-allowed;
  }
`;

export const SelectPlaceholder = styled.option`
  color: ${colors.gray};
`;
