import {
  CalendarClock20Filled,
  CalendarClock20Regular,
  DocumentTextClock20Filled,
  DocumentTextClock20Regular,
} from "@fluentui/react-icons";
import * as S from "./Menu.Styles";
import { MenuItem, MenuItemProps } from "./MenuItem/MenuItem";
import { TabName } from "../../../../enums/tabs";

const MENUS: MenuItemProps[] = [
  {
    id: TabName.eventos,
    text: "eventos",
    activeIcon: CalendarClock20Filled,
    inactiveIcon: CalendarClock20Regular,
  },
  {
    id: TabName.logs,
    text: "logs",
    activeIcon: DocumentTextClock20Filled,
    inactiveIcon: DocumentTextClock20Regular,
  },
];

interface MenuProps {
  currentTab?: TabName;
  onTabSelect?: (item: TabName) => void;
}

export const Menu: React.FC<MenuProps> = function ({
  currentTab,
  onTabSelect,
}) {
  return (
    <S.Wrapper>
      {MENUS.map((menuItemProps) => (
        <MenuItem
          key={menuItemProps.id}
          {...menuItemProps}
          isActive={menuItemProps.id === currentTab}
          onClick={onTabSelect}
        />
      ))}
    </S.Wrapper>
  );
};
