import { useMemo } from "react";
import { colors } from "../../enums/colors";

interface IconProps {
  color: string;
}

export interface OmxIconProps {
  idleIcon: React.FC<IconProps>;
  hoverIcon: React.FC<IconProps>;
  activeIcon: React.FC<IconProps>;
  activeHoverIcon: React.FC<IconProps>;
  isActive?: boolean;
  status?: "hovered" | "pressed" | "disabled";
  colorHovered?: string;
  colorPressed?: string;
  colorDisabled?: string;
  colorIdle?: string;
}

export const OmxIcon: React.FC<OmxIconProps> = function ({
  idleIcon,
  hoverIcon,
  activeIcon,
  activeHoverIcon,
  isActive,
  status,
  colorHovered = colors.gray,
  colorPressed = colors.darkBlue,
  colorDisabled = colors.tBlack,
  colorIdle = colors.black,
}) {
  const icons = useMemo(() => {
    return {
      idle: isActive ? activeIcon : idleIcon,
      hover: isActive ? activeHoverIcon : hoverIcon,
    };
  }, [isActive, activeIcon, idleIcon, activeHoverIcon, hoverIcon]);
  const CurrentIcon = useMemo(() => {
    switch (status) {
      case "hovered":
        return { Icon: icons.hover, color: colorHovered };
      case "pressed":
        return { Icon: icons.hover, color: colorPressed };
      case "disabled":
        return { Icon: icons.idle, color: colorDisabled };
      default:
        return { Icon: icons.idle, color: colorIdle };
    }
  }, [icons, status, colorHovered, colorPressed, colorDisabled, colorIdle]);
  return (
    <>
      <CurrentIcon.Icon color={CurrentIcon.color} />
    </>
  );
};
