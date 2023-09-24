import { css, styled } from "styled-components";
import { colors } from "../../../../../enums/colors";

interface ButtonProps {
  isActive?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  padding: 6px 8px 6px 6px;
  gap: 6px;
  border-radius: 8px 0px 0px 8px;

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;

  border: none;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? css`
          background: ${colors.bg};
          color: ${colors.black};
        `
      : css`
          color: ${colors.fg};
          background: none;
          border-top: 1px solid ${colors.bg};
          border-bottom: 1px solid ${colors.bg};
          border-left: 1px solid ${colors.bg};
        `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;
