import React, { useEffect, useMemo, useRef } from "react";
import { EventException } from "../../../../../../../store/ducks/eventExceptions/eventExceptions.types";
import * as S from "./Card.Styles";
import { OmxIcon } from "../../../../../../../components/OmxIcon/OmxIcon";
import {
  Calendar20Regular,
  Delete24Filled,
  Delete24Regular,
} from "@fluentui/react-icons";
import { colors } from "../../../../../../../enums/colors";
import { useIcons } from "../../../../../../../hooks/useIcons";
import { formatDate } from "../../../../../../../utils/format";

const DATE_FORMAT = "DD/MM/YY";

const DELETE_IN_MILLISECONDS = 1000;

interface CardProps {
  eventException: EventException;
  onDelete?: (eventException: EventException) => void;
  isLoading?: boolean;
}

export const Card: React.FC<CardProps> = function ({
  eventException,
  onDelete,
  isLoading = false,
}) {
  const trashIcon = useIcons();

  const deleteTimeout = useRef<number>();

  const onDeleteRef = useRef<typeof onDelete>();

  onDeleteRef.current = onDelete;

  const formattedDate = useMemo(
    () => formatDate(eventException.date, DATE_FORMAT),
    [eventException]
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(deleteTimeout.current);
    };
  }, []);

  return (
    <S.Wrapper $disabled={isLoading}>
      <S.CardWrapper>
        <S.Header>
          <S.TitleWrapper>
            <Calendar20Regular /> {eventException.description}
          </S.TitleWrapper>
          <S.DateGroupWrapper>
            <S.DateWrapper>{formattedDate}</S.DateWrapper>
            <S.OptionButton
              {...trashIcon.buttonProps}
              $pressAndHoldTimeoutInMilliseconds={1000}
              onMouseDown={(ev) => {
                clearTimeout(deleteTimeout.current);
                deleteTimeout.current = setTimeout(() => {
                  onDeleteRef.current?.(eventException);
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
          </S.DateGroupWrapper>
        </S.Header>
      </S.CardWrapper>
    </S.Wrapper>
  );
};
