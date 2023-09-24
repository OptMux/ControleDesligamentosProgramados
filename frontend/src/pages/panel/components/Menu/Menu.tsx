import {
  CalendarClock20Filled,
  CalendarClock20Regular,
  DocumentTextClock20Filled,
  DocumentTextClock20Regular,
} from "@fluentui/react-icons";
import * as S from "./Menu.Styles";
import { MenuItem, MenuItemProps } from "./MenuItem/MenuItem";
import { useContext } from "react";
import { TabContext } from "../../Panel";
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

export const Menu: React.FC = function () {
  const { currentTab, setCurrentTab } = useContext(TabContext);

  return (
    <S.Wrapper>
      {MENUS.map((menuItemProps) => (
        <MenuItem
          key={menuItemProps.id}
          {...menuItemProps}
          isActive={menuItemProps.id === currentTab}
          onClick={setCurrentTab}
        />
      ))}
    </S.Wrapper>
  );
};
