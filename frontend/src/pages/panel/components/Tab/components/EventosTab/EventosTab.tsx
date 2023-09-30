import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { OmxAccordionItem } from "../../../../../../components/OmxAccordionItem/OmxAccordionItem";
import { OmxEventForm } from "../../../../../../components/OmxEventForm/OmxEventForm";
import { OmxSearchBox } from "../../../../../../components/OmxSearchBox/OmxSearchBox";
import { Month } from "../../../../../../enums/months";
import { useAccordion } from "../../../../../../hooks/useAccordion";
import { useToast } from "../../../../../../hooks/useToast";
import { ToastStatus } from "../../../../../../hooks/useToastPrivate";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { SystemEvent } from "../../../../../../store/ducks/events/events.types";
import {
  doCreateEvent,
  doDeleteEvent,
  doGetEvents,
} from "../../../../../../store/ducks/events/eventsThunks";
import { getMonth } from "../../../../../../utils/getMonth";
import * as PS from "../../Tab.Styles";
import { Card } from "./Card/Card";
import * as S from "./EventosTab.Styles";
import { getMonthValue } from "../../../../../../utils/getMonthValue";

type MonthId = `${Month}-${number}`;
type MonthObject = { id: MonthId; name: Month; events: SystemEvent[] };

export const EventosTab: React.FC = function () {
  const dispatch = useDispatch();
  const { events } = useTypedSelector(({ events }) => ({ events }));
  const { accordionItems, setIsOpen } = useAccordion();
  const notify = useToast();

  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [valueToSearch, setValueToSearch] = useState(searchValue);

  useEffect(() => {
    dispatch(doGetEvents({ search: valueToSearch, ignoreState: true }) as any);
  }, [valueToSearch, dispatch]);

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
    return Array.from(months.values()).sort((monthObjA, monthObjB) => {
      return getMonthValue(monthObjA.name) - getMonthValue(monthObjB.name);
    });
  }, [events.events]);

  return (
    <>
      <S.Header>
        <PS.TabTitle>
          eventos
          {valueToSearch !== ""
            ? ` (Exibindo resultados para: ${valueToSearch})`
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
          <S.Button
            onClick={() => {
              setSearchValue("");
              setIsSearchBoxVisible(false);
              setIsEventFormVisible(!isEventFormVisible);
            }}
          >
            Adicionar novo
          </S.Button>
          {isEventFormVisible && (
            <S.EventFormFloatingWrapper>
              <OmxEventForm
                onConfirm={({ eventData }) => {
                  setIsEventFormVisible(false);

                  dispatch(
                    doCreateEvent({
                      eventData,
                      callback(err) {
                        if (err)
                          return notify({
                            id: `omxEventFormCreateApiError`,
                            title: "Api error",
                            body: err?.message ?? "api error",
                            status: ToastStatus.error,
                          });
                        notify({
                          id: `omxEventFormCreateApiSuccess`,
                          title: "Event",
                          body: "event created successfully",
                          status: ToastStatus.success,
                        });
                      },
                    }) as any
                  );
                }}
                onCancel={() => setIsEventFormVisible(false)}
              />
            </S.EventFormFloatingWrapper>
          )}
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
                isLoading={events.eventsInLoading[event.id]}
                onDelete={(currentEvent) => {
                  dispatch(
                    doDeleteEvent({
                      id: currentEvent.id,
                      callback(err) {
                        if (err)
                          return notify({
                            id: `omxEventFormDeleteApiError-${event.id}`,
                            title: "Api error",
                            body: err?.message ?? "api error",
                            status: ToastStatus.error,
                          });
                        notify({
                          id: `omxEventFormDeleteApiSuccess-${event.id}`,
                          title: "Event",
                          body: "event deleted successfully",
                          status: ToastStatus.success,
                        });
                      },
                    }) as any
                  );
                }}
              />
            ))}
          </OmxAccordionItem>
        ))}
        {events.pageParams && (
          <S.ShowMoreButton
            $disabled={events.isLoading}
            onClick={() => {
              dispatch(doGetEvents({}) as any);
            }}
          >
            Mostrar Mais
          </S.ShowMoreButton>
        )}
      </S.Wrapper>
    </>
  );
};
