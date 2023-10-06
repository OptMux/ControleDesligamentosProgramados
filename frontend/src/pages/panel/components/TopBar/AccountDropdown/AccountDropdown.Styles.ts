import { css, styled } from "styled-components";
import { colors } from "../../../../../enums/colors";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ContainerProps {
  $meta: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${colors.fg};
  border-radius: 4px;
  max-width: 156px;
  min-width: 156px;
  max-height: 40px;
  min-height: 40px;
  padding: 6px;
  cursor: pointer;

  ${({ $meta }) =>
    $meta
      ? css`
          &:not(:hover) .${$meta} {
            display: none;
          }
        `
      : ""}
`;

export const UserAvatar = styled.img`
  width: 28px;
  height: 28px;
  user-select: none;
`;

export const UserName = styled.span`
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  color: ${colors.black};
`;

export const ChevronIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 12px;
  right: 6px;
`;

export const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: calc(100% + 4px);
  right: 0;
  align-items: center;
  gap: 4px;
  background: ${colors.bg};
  border-radius: 4px;
  padding: 4px;
  min-width: 156px;
  min-height: 38px;
  cursor: pointer;

  z-index: 9000000;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 4px;
  }
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 34px;
  border-radius: 2px;
  background: ${colors.fg};
  color: ${colors.black};
  padding: 4px 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  outline: none;
  cursor: pointer;
`;
