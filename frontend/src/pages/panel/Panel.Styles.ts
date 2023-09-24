import { styled } from "styled-components";
import { colors } from "../../enums/colors";

export const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  grid-template-areas:
    "topBar topBar"
    "menu tab";
  grid-template-rows: 64px 1fr;
  grid-template-columns: 192px 1fr;
  background: ${colors.blue};
`;
