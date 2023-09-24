import { styled } from "styled-components";
import { colors } from "../../../../../../../enums/colors";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 8px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 56px;

  background: ${colors.bg};
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  flex-shrink: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  max-height: 56px;

  padding: 0 16px;
  background: ${colors.fg};

  color: ${colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;

  user-select: none;

  cursor: pointer;
  flex-shrink: 0;

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.grayBg};
  padding: 16px;
  gap: 8px;
  flex-shrink: 0;
`;

export const DateGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: ${colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Description = styled.span`
  color: ${colors.black};
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
