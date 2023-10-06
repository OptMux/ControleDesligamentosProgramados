import { styled } from "styled-components";
import { colors } from "../../../../../../enums/colors";
import { DefaultScrollbar } from "../../../../../../styles/scrollbar";

export const WrapperContainer = styled.div`
  position: relative;
  margin-top: 16px;
  margin-bottom: 96px;
  max-height: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  max-height: 100%;
  height: 100%;
  border-radius: 8px;
  background: ${colors.fg};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;

  ${DefaultScrollbar}
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 24px;
  border-radius: 8px;
  background: ${colors.blue};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;

  color: ${colors.fg};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;

  transition: filter 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 8px 0px #0000;
  }
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

export const LoadingContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000003;
  z-index: 9000;
  border-radius: 8px;
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
