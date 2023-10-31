import { ArrowSync24Regular } from "@fluentui/react-icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { OmxSearchBox } from "../../../../../../components/OmxSearchBox/OmxSearchBox";
import { useToast } from "../../../../../../hooks/useToast";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import {
  doCreateEventException,
  doDeleteEventException,
  doGetEventExceptions,
} from "../../../../../../store/ducks/eventExceptions/eventExceptionsThunks";
import * as PS from "../../Tab.Styles";
import { Card } from "./Card/Card";
import * as S from "./ExcecoesTab.Styles";
import { ToastStatus } from "../../../../../../hooks/useToastPrivate";
import { OmxEventExceptionForm } from "../../../../../../components/OmxEventExceptionForm/OmxEventExceptionForm";

export const ExcecoesTab: React.FC = function () {
  const dispatch = useDispatch();
  const { eventExceptions } = useTypedSelector(({ eventExceptions }) => ({
    eventExceptions,
  }));
  const notify = useToast();

  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isEventExceptionFormVisible, setIsEventExceptionFormVisible] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [valueToSearch, setValueToSearch] = useState(searchValue);

  useEffect(() => {
    dispatch(
      doGetEventExceptions({ search: valueToSearch, ignoreState: true }) as any
    );
  }, [valueToSearch, dispatch]);

  const orderedEventExceptions = useMemo(() => {
    return [...eventExceptions.eventExceptions]?.sort?.(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [eventExceptions.eventExceptions]);

  return (
    <>
      <S.Header>
        <PS.TabTitle>
          exceções
          {valueToSearch !== ""
            ? ` (Exibindo resultados para: ${valueToSearch})`
            : ""}
        </PS.TabTitle>
        <S.HeaderButtonsWrapper>
          <S.Button
            onClick={() => {
              if (valueToSearch) {
                setSearchValue("");
                setValueToSearch("");
              } else
                dispatch(doGetEventExceptions({ ignoreState: true }) as any);
            }}
          >
            <ArrowSync24Regular />
          </S.Button>
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
              setIsEventExceptionFormVisible(!isEventExceptionFormVisible);
            }}
          >
            Adicionar novo
          </S.Button>
          {isEventExceptionFormVisible && (
            <S.EventFormFloatingWrapper>
              <OmxEventExceptionForm
                onConfirm={({ eventExceptionData }) => {
                  dispatch(
                    doCreateEventException({
                      eventExceptionData,
                      callback(err) {
                        if (err)
                          return notify({
                            id: `omxEventExceptionFormCreateApiError`,
                            title: "Api error",
                            body: err?.message ?? "api error",
                            status: ToastStatus.error,
                          });
                        notify({
                          id: `omxEventExceptionFormCreateApiSuccess`,
                          title: "Event",
                          body: "event exception created successfully",
                          status: ToastStatus.success,
                        });
                        setIsEventExceptionFormVisible(false);
                      },
                    }) as any
                  );
                }}
                onCancel={() => setIsEventExceptionFormVisible(false)}
              />
            </S.EventFormFloatingWrapper>
          )}
        </S.HeaderButtonsWrapper>
      </S.Header>
      <S.Wrapper>
        {orderedEventExceptions.map((eventException) => (
          <Card
            key={eventException.id}
            eventException={eventException}
            isLoading={
              eventExceptions.eventExceptionsInLoading[eventException.id]
            }
            onDelete={(eventException) => {
              dispatch(
                doDeleteEventException({
                  id: eventException.id,
                  callback(err) {
                    if (err)
                      return notify({
                        id: `omxEventExceptionFormDeleteApiError-${eventException.id}`,
                        title: "Api error",
                        body: err?.message ?? "api error",
                        status: ToastStatus.error,
                      });
                    notify({
                      id: `omxEventExceptionFormDeleteApiSuccess-${eventException.id}`,
                      title: "Event Exception",
                      body: "event exception deleted successfully",
                      status: ToastStatus.success,
                    });
                  },
                }) as any
              );
            }}
          />
        ))}
        {eventExceptions.pageParams && (
          <S.ShowMoreButton
            $disabled={eventExceptions.isLoading}
            onClick={() => {
              dispatch(doGetEventExceptions({}) as any);
            }}
          >
            Mostrar Mais
          </S.ShowMoreButton>
        )}
      </S.Wrapper>
    </>
  );
};
