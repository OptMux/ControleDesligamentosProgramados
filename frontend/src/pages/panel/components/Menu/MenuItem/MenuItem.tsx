import { useMemo } from "react";
import * as S from "./MenuItem.Styles";
import { colors } from "../../../../../enums/colors";
import { TabName } from "../../../../../enums/tabs";

interface IconProps {
  color: string;
}

export interface MenuItemProps {
  id: TabName;
  text: string;
  activeIcon: React.FC<IconProps>;
  inactiveIcon: React.FC<IconProps>;
  isActive?: boolean;
  onClick?: (id: MenuItemProps["id"]) => void;
}

export const MenuItem: React.FC<MenuItemProps> = function ({
  id,
  text,
  activeIcon,
  inactiveIcon,
  isActive,
  onClick,
}) {
  const Icon = useMemo(
    () => (isActive ? activeIcon : inactiveIcon),
    [activeIcon, inactiveIcon, isActive]
  );

  const iconColor = useMemo(
    () => (isActive ? colors.black : colors.fg),
    [isActive]
  );

  return (
    <S.Button isActive={isActive} onClick={() => onClick?.(id)}>
      <S.IconWrapper>
        <Icon color={iconColor} />
      </S.IconWrapper>{" "}
      <span>{text}</span>
    </S.Button>
  );
};
