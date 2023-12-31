import { styled } from "styled-components";
import { colors } from "../../enums/colors";

export const WrapperForm = styled.form`
  display: flex;
  height: 64px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: ${colors.fg};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;

export const Input = styled.input`
  padding: 0px 16px;
  gap: 10px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  height: 32px;

  color: ${colors.black};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  outline: none;
  border: none;
`;

interface ButtonProps {
  $isCancel?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;

  gap: 10px;
  height: 32px;

  min-width: 50px;
  border-radius: 4px;
  background: ${({ $isCancel }) => ($isCancel ? colors.red : colors.blue)};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);

  color: ${colors.fg};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  outline: none;

  transition: box-shadow 0.3s ease, filter 0.3s ease;

  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 8px 0px #0000;
  }
`;
