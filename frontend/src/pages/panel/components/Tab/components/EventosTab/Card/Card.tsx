import React, { useEffect, useMemo, useRef, useState } from "react";
import type { SystemEvent } from "../../../../../../../store/ducks/events/events.types";
import * as S from "./Card.Styles";
import { formatDate } from "../../../../../../../utils/format";
import { colors } from "../../../../../../../enums/colors";
import { Tag } from "../../../../../../../styles/tag";
import { OmxIcon } from "../../../../../../../components/OmxIcon/OmxIcon";
import { useIcons } from "../../../../../../../hooks/useIcons";
import {
  Delete24Filled,
  Delete24Regular,
  Pen24Filled,
  Pen24Regular,
} from "@fluentui/react-icons";
import { OmxEventForm } from "../../../../../../../components/OmxEventForm/OmxEventForm";

const DATE_FORMAT = "DD/MM/YY às HH:mm";

interface TagData {
  name: string;
  bgColor?: string;
  color?: string;
}

interface DateData {
  formattedDate: string;
  tag: TagData;
}

interface CardProps {
  event: SystemEvent;
  onDelete?: (event: SystemEvent) => void;
}

const DELETE_IN_MILLISECONDS = 1000;

export const Card: React.FC<CardProps> = function ({ event, onDelete }) {
  const [isEditEventFormVisible, setIsEditEventFormVisible] = useState(false);
  const penIcon = useIcons();
  const trashIcon = useIcons();

  const deleteTimeout = useRef<number>();

  const onDeleteRef = useRef<typeof onDelete>();

  onDeleteRef.current = onDelete;

  const dates: {
    start: DateData;
    finish?: DateData;
  } = useMemo(() => {
    if (!event.startedAt) {
      return {
        start: {
          formattedDate: formatDate(event.startDate, DATE_FORMAT),
          tag: {
            name: "Início",
            bgColor: colors.blue,
            color: colors.white,
          },
        },
        finish: {
          formattedDate: formatDate(event.finishDate, DATE_FORMAT),
          tag: {
            name: "Término",
            color: colors.white,
            bgColor: colors.yellow,
          },
        },
      };
    }
    return {
      start: {
        formattedDate: formatDate(event.startedAt, DATE_FORMAT),
        tag: {
          name: "Iníciado",
          bgColor: colors.green,
        },
      },
      ...(event.finishedAt
        ? {
            finish: {
              formattedDate: formatDate(event.finishedAt, DATE_FORMAT),
              tag: {
                name: "Finalizado",
                bgColor: colors.red,
              },
            },
          }
        : null),
    };
  }, [event.startDate, event.startedAt, event.finishDate, event.finishedAt]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(deleteTimeout.current);
    };
  }, []);

  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <span>{event.title}</span>
          <S.DateGroupWrapper>
            <S.DateWrapper>
              {Object.entries(dates).map(([key, value]) => (
                <React.Fragment key={key}>
                  <Tag
                    $bgColor={value.tag.bgColor}
                    $textColor={value.tag.color}
                  >
                    {value.tag.name}
                  </Tag>
                  <span>{value.formattedDate}</span>
                </React.Fragment>
              ))}
            </S.DateWrapper>
          </S.DateGroupWrapper>
        </S.Header>
        <S.Body>
          <Tag $bgColor={colors.white}>Descrição:</Tag>
          <S.Description>{event.description}</S.Description>
        </S.Body>
      </S.CardWrapper>
      <S.OptionsWrapper className="options-wrapper">
        <S.OptionButton
          {...penIcon.buttonProps}
          onClick={() => setIsEditEventFormVisible(!isEditEventFormVisible)}
        >
          <OmxIcon
            idleIcon={Pen24Regular}
            hoverIcon={Pen24Filled}
            activeIcon={Pen24Filled}
            activeHoverIcon={Pen24Regular}
            {...penIcon.iconProps}
          />
        </S.OptionButton>
        <S.OptionButton
          {...trashIcon.buttonProps}
          $pressAndHoldTimeoutInMilliseconds={1000}
          onMouseDown={(ev) => {
            clearTimeout(deleteTimeout.current);
            deleteTimeout.current = setTimeout(() => {
              onDeleteRef.current?.(event);
            }, DELETE_IN_MILLISECONDS);

            trashIcon.buttonProps.onMouseDown?.(ev);
          }}
          onMouseUp={(ev) => {
            clearTimeout(deleteTimeout.current);
            trashIcon.buttonProps.onMouseUp?.(ev);
          }}
          onMouseLeave={(ev) => {
            clearTimeout(deleteTimeout.current);
            trashIcon.buttonProps.onMouseLeave?.(ev);
          }}
        >
          <OmxIcon
            idleIcon={Delete24Regular}
            hoverIcon={Delete24Filled}
            activeIcon={Delete24Filled}
            activeHoverIcon={Delete24Regular}
            colorPressed={colors.red}
            {...trashIcon.iconProps}
          />
        </S.OptionButton>
      </S.OptionsWrapper>
      {isEditEventFormVisible && (
        <S.EventFormFloatingWrapper>
          <OmxEventForm
            event={event}
            onConfirm={() => {
              setIsEditEventFormVisible(false);
            }}
            onCancel={() => setIsEditEventFormVisible(false)}
          />
        </S.EventFormFloatingWrapper>
      )}
    </S.Wrapper>
  );
};
