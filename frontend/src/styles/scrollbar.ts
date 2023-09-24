import { css } from "styled-components";

export const DefaultScrollbar = css`
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #0000;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00000040;
    border-radius: 10px;
  }
`;
