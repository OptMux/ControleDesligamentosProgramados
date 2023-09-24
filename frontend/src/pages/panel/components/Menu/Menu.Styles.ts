import { styled } from "styled-components";
import { colors } from "../../../../enums/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: menu;
  gap: 4px;
  background-color: ${colors.blue};
  padding-left: 8px;
  padding-top: 32px;
  padding-bottom: 32px;
`;
