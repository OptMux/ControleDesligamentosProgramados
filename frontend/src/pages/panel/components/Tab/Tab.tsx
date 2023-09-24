import { useContext } from "react";
import * as S from "./Tab.Styles";
import { TabContext } from "../../Panel";
import { TabName } from "../../../../enums/tabs";
import { EventosTab } from "./components/EventosTab/EventosTab";
import { LogsTab } from "./components/LogsTab/LogsTab";

export const Tab: React.FC = function () {
  const { currentTab } = useContext(TabContext);
  return (
    <S.Wrapper>
      <S.TabWrapper>
        {{
          [TabName.eventos]: () => <EventosTab />,
          [TabName.logs]: () => <LogsTab />,
        }[currentTab]?.()}
      </S.TabWrapper>
    </S.Wrapper>
  );
};
