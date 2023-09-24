import { styled } from "styled-components";
import { colors } from "../enums/colors";

interface WrapperProps {
  bgColor?: string;
  textColor?: string;
}

export const Tag = styled.span<WrapperProps>`
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  height: 24px;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: ${({ bgColor }) => bgColor ?? colors.blue};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  color: ${({ textColor }) => textColor ?? colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
