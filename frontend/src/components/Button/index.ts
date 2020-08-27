import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'normal' | 'small';
}

const getSizeStyle = ({ size = 'normal' }: ButtonProps) => {
  return size === 'normal'
    ? css`
        font-weight: bold;
        font-size: 18px;
        min-width: 180px;
        padding: 10px;
        border-radius: 8px;
      `
    : css`
        font-weight: normal;
        font-size: 13px;
        min-width: 120px;
        padding: 5px;
        border-radius: 4px;
      `;
};

const getVariantStyle = ({ variant = 'primary' }: ButtonProps) => {
  return variant === 'primary'
    ? css`
        color: ${colors.white};
        background-color: ${colors.primary};

        &:hover {
          background-color: ${colors.primaryHover};
        }
      `
    : css`
        color: ${colors.primary};
        background-color: ${colors.white};

        &:hover {
          background-color: ${colors.secondaryHover};
        }
      `;
};

const Button = styled.button<ButtonProps>`
  transition: background-color 200ms ease-in-out;
  ${getSizeStyle}
  ${getVariantStyle}
`;

export default Button;
