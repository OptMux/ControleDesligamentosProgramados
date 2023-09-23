import { ButtonHTMLAttributes } from "react";
import * as S from "./OmxMainButton.Styles";

interface OmxMainButtonProps {
  text?: string; // default: "Submit";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]; // default: "submit";
  fullWidth?: boolean; // default: false;
  onClick?: () => void;
}

export const OmxMainButton: React.FC<OmxMainButtonProps> = function ({
  text = "Submit",
  type = "submit",
  fullWidth = false,
  onClick,
}) {
  return (
    <S.Wrapper fullWidth={fullWidth}>
      <S.Button type={type} onClick={onClick}>
        {text}
      </S.Button>
    </S.Wrapper>
  );
};
