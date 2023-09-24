import { styled } from "styled-components";
import { colors } from "../../../../enums/colors";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  grid-area: tab;
  background: ${colors.bg};
  border-radius: 8px 0px 0px 0px;
  overflow-y: hidden;
`;

export const TabWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 96px;
  padding-right: 96px;
  padding-top: 48px;
`;

export const TabTitle = styled.span`
  display: flex;
  align-items: center;
  color: ${colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 16px;
  text-transform: capitalize;
`;
