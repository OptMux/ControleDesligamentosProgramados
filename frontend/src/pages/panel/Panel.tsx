import { useState } from "react";
import * as S from "./Panel.Styles";
import { Menu } from "./components/Menu/Menu";
import { Tab } from "./components/Tab/Tab";
import { TopBar } from "./components/TopBar/TopBar";
import { TabName } from "../../enums/tabs";
import { OmxHead } from "../../components/OmxHead/OmxHead";

export const PanelPage: React.FC = function () {
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.eventos);

  return (
    <>
      <OmxHead title="Panel" />
      <S.Wrapper>
        <TopBar />
        <Menu currentTab={currentTab} onTabSelect={setCurrentTab} />
        <Tab currentTab={currentTab} />
      </S.Wrapper>
    </>
  );
};
