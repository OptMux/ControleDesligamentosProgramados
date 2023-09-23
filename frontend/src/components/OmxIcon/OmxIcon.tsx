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
}

export const OmxIcon: React.FC<OmxIconProps> = function ({
  idleIcon,
  hoverIcon,
  activeIcon,
  activeHoverIcon,
  isActive,
  status,
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
        return { Icon: icons.hover, color: colors.gray };
      case "pressed":
        return { Icon: icons.hover, color: colors.darkBlue };
      case "disabled":
        return { Icon: icons.idle, color: colors.tBlack };
      default:
        return { Icon: icons.idle, color: colors.black };
    }
  }, [icons, status]);
  return (
    <>
      <CurrentIcon.Icon color={CurrentIcon.color} />
    </>
  );
};
