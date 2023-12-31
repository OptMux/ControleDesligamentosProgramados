import { css, styled } from "styled-components";
import { colors } from "../../../../../../enums/colors";
import { DefaultScrollbar } from "../../../../../../styles/scrollbar";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  height: 100%;
  overflow-y: auto;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  margin-top: 8px;
  padding-bottom: 16px;

  scrollbar-width: thin;
  scrollbar-color: #00000040 #0000;

  & * {
    flex-shrink: 0;
  }

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
  min-height: 42px;
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

interface ShowMoreButtonProps {
  $disabled?: boolean;
}

export const ShowMoreButton = styled.button<ShowMoreButtonProps>`
  display: flex;
  min-width: 200px;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 24px;
  border-radius: 8px;
  background: #0000;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);

  ${({ $disabled }) =>
    $disabled
      ? css`
          pointer-events: none;
          --color-bg: ${colors.gray};
          --color-fg: ${colors.fg};
        `
      : css`
          --color-bg: ${colors.blue};
          --color-fg: ${colors.fg};
        `}

  border: 1px solid var(--color-bg);
  outline: none;

  color: var(--color-bg);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;

  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    color: var(--color-fg);
    background: var(--color-bg);
    box-shadow: 0px 0px 8px 0px #0000;
  }
`;

export const SearchBoxFloatingWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 160px;
  transform: translateY(-50%);
  z-index: 8000;
`;

export const EventFormFloatingWrapper = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  z-index: 8000;
`;
