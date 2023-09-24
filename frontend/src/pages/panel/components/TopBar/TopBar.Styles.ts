import { styled } from "styled-components";
import { colors } from "../../../../enums/colors";

export const Wrapper = styled.div`
  grid-area: topBar;
  position: relative;
  display: grid;
  align-items: center;
  min-height: 64px;
  max-height: 64px;
  background: ${colors.blue};
  grid-template-columns: 192px auto 224px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 130px;
  height: 32px;
  margin: 14px;
  user-select: none;
`;

export const Title = styled.span`
  color: ${colors.white};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;
