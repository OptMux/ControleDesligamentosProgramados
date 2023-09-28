import { css, styled } from "styled-components";
import { colors } from "../../../../../../../enums/colors";

interface WrapperProps {
  $disabled?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: 100%;
  column-gap: 8px;

  &:not(:hover) {
    .options-wrapper {
      display: none;
    }
  }

  transition: filter 0.3s ease;

  ${({ $disabled }) =>
    $disabled
      ? css`
          filter: brightness(0.6);
          pointer-events: none;
        `
      : ""}
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  min-height: 56px;
  flex-grow: 1;
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

  flex-shrink: 0;

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 100%;
  width: 56px;
  min-width: 56px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  flex-shrink: 0;
  background: ${colors.fg};
`;

interface OptionButtonProps {
  $pressAndHoldTimeoutInMilliseconds?: number;
}

export const OptionButton = styled.button<OptionButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  overflow: hidden;

  border: none;
  outline: none;
  cursor: pointer;

  background: #0000;

  transition: background 0.3s ease;

  &:hover {
    background: ${colors.grayBg};
  }

  ${({ $pressAndHoldTimeoutInMilliseconds }) =>
    $pressAndHoldTimeoutInMilliseconds
      ? css`
          &::before {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            display: block;
            width: 0;
            height: 100%;
            background: ${colors.red};
            opacity: 0.5;
          }

          &:active {
            &::before {
              width: 100%;
              transition: width ${$pressAndHoldTimeoutInMilliseconds}ms ease-in;
            }
          }
        `
      : ""}
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

export const EventFormFloatingWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 8000;
`;
