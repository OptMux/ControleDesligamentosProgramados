import { styled, css } from "styled-components";
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

export const Input = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  color: ${colors.black};
  background: ${colors.fg};
  padding: 0px 16px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  line-height: 18px;
`;

export const InputButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 48px;
  min-width: 48px;
  height: 48px;
  border: none;
  outline: none;
  border-radius: 8px;
  background: ${colors.fg};
`;
