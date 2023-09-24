import React, { useMemo } from "react";
import type { SystemEvent } from "../../../../../../../store/ducks/events/events.types";
import * as S from "./Card.Styles";
import { formatDate } from "../../../../../../../utils/format";
import { colors } from "../../../../../../../enums/colors";
import { Tag } from "../../../../../../../styles/tag";

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
}

export const Card: React.FC<CardProps> = function ({ event }) {
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
            name: "Fim",
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
    </S.Wrapper>
  );
};
