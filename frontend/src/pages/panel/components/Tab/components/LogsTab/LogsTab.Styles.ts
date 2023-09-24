import { styled } from "styled-components";
import { colors } from "../../../../../../enums/colors";
import { DefaultScrollbar } from "../../../../../../styles/scrollbar";

export const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  margin-bottom: 96px;
  max-height: 100%;
  height: 100%;
  border-radius: 8px;
  background: ${colors.fg};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;

  ${DefaultScrollbar}
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 24px;
`;

export const LogText = styled.span`
  overflow: hidden;
  color: ${colors.black};
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
