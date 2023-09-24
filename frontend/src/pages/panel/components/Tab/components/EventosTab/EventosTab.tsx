import { useMemo } from "react";
import { OmxAccordionItem } from "../../../../../../components/OmxAccordionItem/OmxAccordionItem";
import { useAccordion } from "../../../../../../hooks/useAccordion";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import * as PS from "../../Tab.Styles";
import * as S from "./EventosTab.Styles";
import { Month } from "../../../../../../enums/months";
import { getMonth } from "../../../../../../utils/getMonth";
import { SystemEvent } from "../../../../../../store/ducks/events/events.types";
import { Card } from "./Card/Card";

type MonthId = `${Month}-${number}`;
type MonthObject = { id: MonthId; name: Month; events: SystemEvent[] };

export const EventosTab: React.FC = function () {
  const { events } = useTypedSelector(({ events }) => ({ events }));
  const { accordionItems, setIsOpen } = useAccordion();

  const eventsSeparatedByMonth = useMemo(() => {
    const months = new Map<MonthId, MonthObject>();
    events.events.forEach((event) => {
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
  }, [events.events]);

  return (
    <>
      <S.Header>
        <PS.TabTitle>eventos</PS.TabTitle>
        <S.HeaderButtonsWrapper>
          <S.Button>Pesquisar</S.Button>
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
              <Card key={event.id} event={event} />
            ))}
          </OmxAccordionItem>
        ))}
      </S.Wrapper>
    </>
  );
};
