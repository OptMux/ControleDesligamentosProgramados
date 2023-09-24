import { useMemo, useState } from "react";
import { OmxAccordionItem } from "../../../../../../components/OmxAccordionItem/OmxAccordionItem";
import { useAccordion } from "../../../../../../hooks/useAccordion";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import * as PS from "../../Tab.Styles";
import * as S from "./EventosTab.Styles";
import { Month } from "../../../../../../enums/months";
import { getMonth } from "../../../../../../utils/getMonth";
import { SystemEvent } from "../../../../../../store/ducks/events/events.types";
import { Card } from "./Card/Card";
import { OmxSearchBox } from "../../../../../../components/SearchBox/OmxSearchBox";

type MonthId = `${Month}-${number}`;
type MonthObject = { id: MonthId; name: Month; events: SystemEvent[] };

export const EventosTab: React.FC = function () {
  const { events } = useTypedSelector(({ events }) => ({ events }));
  const { accordionItems, setIsOpen } = useAccordion();

  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [valueToSearch, setValueToSearch] = useState(searchValue);

  const eventsSeparatedByMonth = useMemo(() => {
    const months = new Map<MonthId, MonthObject>();
    const lowerValueToSearch = valueToSearch
      ?.toLowerCase?.()
      ?.trim?.()
      ?.split?.(" ");

    events.events.forEach((event) => {
      const formattedTitle = event.title?.toLowerCase?.()?.trim?.();
      if (!lowerValueToSearch.every((value) => formattedTitle.includes(value)))
        return;
      const month = getMonth(event.startDate);
      const year = new Date(event.startDate).getFullYear();

      const monthId: MonthId = `${month}-${year}`;
      const monthObject = months.get(monthId) ?? {
        id: monthId,
        name: month,
        events: [],
      };
      monthObject.events.push(event);
      months.set(monthId, monthObject);
    });
    return Array.from(months.values());
  }, [events.events, valueToSearch]);

  return (
    <>
      <S.Header>
        <PS.TabTitle>
          eventos
          {valueToSearch !== ""
            ? ` Exibindo resultados para: ${valueToSearch}`
            : ""}
        </PS.TabTitle>
        <S.HeaderButtonsWrapper>
          <S.Button
            onClick={() => {
              setSearchValue("");
              setValueToSearch("");
              setIsSearchBoxVisible(!isSearchBoxVisible);
            }}
          >
            Pesquisar
          </S.Button>
          {isSearchBoxVisible && (
            <S.SearchBoxFloatingWrapper>
              <OmxSearchBox
                value={searchValue}
                onChange={setSearchValue}
                onConfirm={(value) => (
                  setValueToSearch(value), setIsSearchBoxVisible(false)
                )}
                onCancel={() => (
                  setValueToSearch(""), setIsSearchBoxVisible(false)
                )}
              />
            </S.SearchBoxFloatingWrapper>
          )}
          <S.Button>Adicionar novo</S.Button>
        </S.HeaderButtonsWrapper>
      </S.Header>
      <S.Wrapper>
        {eventsSeparatedByMonth.map((monthObject) => (
          <OmxAccordionItem
            key={monthObject.id}
            title={monthObject.name}
            isOpen={accordionItems.get(monthObject.id)}
            onClick={() => setIsOpen(monthObject.id)}
          >
            {monthObject.events.map((event) => (
              <Card
                key={event.id}
                event={event}
                onDelete={(currentEvent) => {
                  alert(`Deleting ${currentEvent.title}`);
                }}
              />
            ))}
          </OmxAccordionItem>
        ))}
      </S.Wrapper>
    </>
  );
};
