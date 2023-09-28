import * as S from "./Tab.Styles";
import { TabName } from "../../../../enums/tabs";
import { EventosTab } from "./components/EventosTab/EventosTab";
import { LogsTab } from "./components/LogsTab/LogsTab";

interface TabProps {
  currentTab?: TabName;
}

export const Tab: React.FC<TabProps> = function ({ currentTab }) {
  return (
    <S.Wrapper>
      <S.TabWrapper>
        {currentTab === TabName.eventos && <EventosTab />}
        {currentTab === TabName.logs && <LogsTab />}
      </S.TabWrapper>
    </S.Wrapper>
  );
};
