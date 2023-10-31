import { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useToast } from "../../hooks/useToast";
import { ToastStatus } from "../../hooks/useToastPrivate";
import { SystemEvent } from "../../store/ducks/events/events.types";
import { dateFactory } from "../../utils/date";
import * as S from "./OmxEventForm.Styles";

interface DataProps {
  event?: SystemEvent;
  eventData: Pick<
    SystemEvent,
    "title" | "description" | "startDate" | "finishDate"
  >;
}

interface OmxEventFormProps {
  event?: SystemEvent;
  isLoading?: boolean;
  onConfirm: (data: DataProps) => void;
  onCancel: () => void;
}

const DESCRIPTION_CHAR_LIMIT = 128;

export const OmxEventForm: React.FC<OmxEventFormProps> = function ({
  event,
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const notify = useToast();

  const [startDate, setStartDate] = useState(
    event?.startDate ? new Date(event?.startDate) : dateFactory(10, 0)
  );
  const [finishDate, setFinishDate] = useState(
    event?.finishDate ? new Date(event?.finishDate) : dateFactory(14, 0)
  );

  const [descriptionValue, setDescriptionValue] = useState(
    event?.description ?? ""
  );

  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelRef = useRef<typeof onCancel>();
  const clickedRef = useRef<boolean>(false);

  const isCalendarOpenRef = useRef<{ value: boolean; timeout: any }>({
    value: false,
    timeout: null,
  });

  const onCalendarOpen = useCallback(() => {
    clearTimeout(isCalendarOpenRef.current?.timeout);
    isCalendarOpenRef.current = {
      value: true,
      timeout: null,
    };
  }, []);

  const onCalendarClose = useCallback(() => {
    clearTimeout(isCalendarOpenRef.current?.timeout);
    isCalendarOpenRef.current = {
      value: isCalendarOpenRef.current?.value ?? false,
      timeout: setTimeout(() => {
        isCalendarOpenRef.current.value = false;
        isCalendarOpenRef.current.timeout = null;
      }, 100),
    };
  }, []);

  const onCancelHandler = useCallback(() => {
    if (!isLoading) return onCancel?.();
  }, [isLoading, onCancel]);

  cancelRef.current = onCancelHandler;

  useEffect(() => {
    inputRef.current?.focus?.();
    const clickListener = (ev: MouseEvent) => {
      if (!clickedRef.current) {
        clickedRef.current = true;
        return;
      }

      if (isCalendarOpenRef.current?.value) return;

      if (
        !(
          ev.target === containerRef.current ||
          containerRef.current?.contains?.(ev.target as any)
        )
      ) {
        cancelRef.current?.();
      }
    };

    const keyListener = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case "Escape": {
          cancelRef.current?.();
          break;
        }
      }
    };
    window.addEventListener("click", clickListener);
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("click", clickListener);
      window.removeEventListener("keydown", keyListener);
    };
  }, []);

  return (
    <S.WrapperForm
      ref={containerRef}
      $isLoading={isLoading}
      onSubmit={(ev) => {
        ev.preventDefault();
        const form = ev.currentTarget;
        const data = new FormData(form);
        const resultData: DataProps = {
          event,
          eventData: {
            title: data.get("title") as string,
            description: data.get("description") as string,
            startDate: startDate,
            finishDate: finishDate,
          },
        };

        if (
          [resultData.eventData.title, resultData.eventData.description].every(
            Boolean
          )
        )
          return onConfirm?.(resultData);

        return notify({
          id: "omxEventFormValidationError",
          title: "Erro de validação",
          body: "Preencha todos os campos",
          status: ToastStatus.error,
        });
      }}
    >
      <S.InputWrapper>
        <S.Input
          ref={inputRef}
          name="title"
          type="text"
          autoComplete="off"
          defaultValue={event?.title ?? ""}
          placeholder="Nome do evento"
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Input
          name="description"
          type="text"
          placeholder="Descrição"
          maxLength={DESCRIPTION_CHAR_LIMIT}
          value={descriptionValue ?? ""}
          onChange={(ev) => setDescriptionValue(ev?.target?.value)}
          autoComplete="off"
        />
        <S.InputLimitIndicator>
          {descriptionValue.length}/{DESCRIPTION_CHAR_LIMIT}
        </S.InputLimitIndicator>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.DateInputLabel>Início</S.DateInputLabel>
        <S.DateInputGroupWrapper>
          <S.DateInputGroup>
            <DatePicker
              selected={startDate}
              showTimeInput
              locale="pt-BR"
              dateFormat="Pp"
              onCalendarOpen={onCalendarOpen}
              onCalendarClose={onCalendarClose}
              onChange={(date) => setStartDate(date as Date)}
            />
          </S.DateInputGroup>
        </S.DateInputGroupWrapper>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.DateInputLabel>Término</S.DateInputLabel>
        <S.DateInputGroupWrapper>
          <S.DateInputGroup>
            <DatePicker
              selected={finishDate}
              showTimeInput
              locale="pt-BR"
              dateFormat="Pp"
              onCalendarOpen={onCalendarOpen}
              onCalendarClose={onCalendarClose}
              onChange={(date) => setFinishDate(date as Date)}
            />
          </S.DateInputGroup>
        </S.DateInputGroupWrapper>
      </S.InputWrapper>
      <S.ButtonGroup>
        <S.Button
          type="button"
          $isCancel
          onClick={() => {
            onCancelHandler?.();
          }}
        >
          Cancelar
        </S.Button>
        <S.Button type="submit">{event ? "Editar" : "Adicionar"}</S.Button>
      </S.ButtonGroup>
    </S.WrapperForm>
  );
};
