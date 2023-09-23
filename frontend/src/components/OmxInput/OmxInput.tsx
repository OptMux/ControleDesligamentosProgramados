import { useEffect, useMemo, useState } from "react";
import * as S from "./OmxInput.Styles";
import {
  Eye24Filled,
  Eye24Regular,
  EyeOff24Regular,
  EyeOff24Filled,
} from "@fluentui/react-icons";
import { OmxIcon } from "../OmxIcon/OmxIcon";
import { useIcons } from "../../hooks/useIcons";

interface OmxInputProps {
  placeholder?: string;
  fullWidth?: boolean;
  value?: string;
  onInput?: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

export const OmxInput: React.FC<OmxInputProps> = ({
  fullWidth = false,
  placeholder,
  value,
  type = "text",
  onInput,
}) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { iconProps, buttonProps } = useIcons();

  const isPassword = useMemo(() => type === "password", [type]);
  const currentType = useMemo(() => {
    if (isPassword) {
      if (passwordIsVisible) return "text";
    }
    return type;
  }, [type, passwordIsVisible, isPassword]);

  useEffect(() => {
    setPasswordIsVisible(false);
  }, [value]);

  return (
    <S.Wrapper fullWidth={fullWidth}>
      <S.Input
        onChange={(ev) => {
          const target: HTMLInputElement = ev.target as HTMLInputElement;
          if (passwordIsVisible) setPasswordIsVisible(false);
          onInput?.(target?.value);
        }}
        value={value}
        placeholder={placeholder}
        spellCheck={false}
        type={currentType}
      />

      {isPassword ? (
        <S.InputButton
          type="button"
          onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          {...buttonProps}
        >
          <OmxIcon
            idleIcon={Eye24Regular}
            hoverIcon={Eye24Filled}
            activeIcon={EyeOff24Regular}
            activeHoverIcon={EyeOff24Filled}
            isActive={passwordIsVisible}
            {...iconProps}
          />
        </S.InputButton>
      ) : null}
    </S.Wrapper>
  );
};
