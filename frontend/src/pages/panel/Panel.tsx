import { createContext, useState } from "react";
import * as S from "./Panel.Styles";
import { Menu } from "./components/Menu/Menu";
import { Tab } from "./components/Tab/Tab";
import { TopBar } from "./components/TopBar/TopBar";
import { TabName } from "../../enums/tabs";
import { OmxHead } from "../../components/OmxHead/OmxHead";

interface TabContextProps {
  currentTab: TabName;
  setCurrentTab: React.Dispatch<React.SetStateAction<TabName>>;
}

export const TabContext = createContext<TabContextProps>(null as any);

export const PanelPage: React.FC = function () {
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.eventos);
  return (
    <>
      <OmxHead title="Panel" />

      <S.Wrapper>
        <TabContext.Provider
          value={{
            currentTab,
            setCurrentTab,
          }}
        >
          <TopBar />
          <Menu />
          <Tab />
        </TabContext.Provider>
      </S.Wrapper>
    </>
  );
};
