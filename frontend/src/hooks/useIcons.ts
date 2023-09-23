import { ButtonHTMLAttributes, useMemo, useState } from "react";
import type { OmxIconProps } from "../components/OmxIcon/OmxIcon";

type UseIconsReturnType = {
  iconProps: Pick<OmxIconProps, "status">;
  buttonProps: Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onMouseDown" | "onMouseUp" | "onMouseEnter" | "onMouseLeave"
  >;
};

export function useIcons(disabled: boolean = false): UseIconsReturnType {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const status: OmxIconProps["status"] = useMemo(() => {
    if (disabled) return "disabled";
    if (isHovering) {
      if (isPressed) return "pressed";
      return "hovered";
    }
  }, [disabled, isHovering, isPressed]);

  const buttonProps: UseIconsReturnType["buttonProps"] = useMemo(
    () => ({
      onMouseDown() {
        setIsPressed(true);
      },
      onMouseUp() {
        setIsPressed(false);
      },
      onMouseEnter() {
        setIsHovering(true);
      },
      onMouseLeave() {
        setIsHovering(false);
        setIsPressed(false);
      },
    }),
    []
  );

  return {
    iconProps: {
      status,
    },
    buttonProps,
  };
}
