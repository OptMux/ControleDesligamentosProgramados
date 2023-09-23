import { css, styled } from "styled-components";
import { colors } from "../../enums/colors";

type WrapperProps = {
  fullWidth: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  column-gap: 6px;
  height: 48px;
  min-height: 48px;
  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : ""}
`;

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  width: 100%;
  color: ${colors.black};
  background: ${colors.lightBlue};
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  outline: none;

  transition: filter 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 8px 0px #0000;
  }
`;
