import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./OmxEventForm.Styles";
import {
  CURRENT_YEAR,
  getDateInfo,
  useDateForm,
} from "../../hooks/useDateForm";
import { useToast } from "../../hooks/useToast";
import { ToastStatus } from "../../hooks/useToastPrivate";
import { SystemEvent } from "../../store/ducks/events/events.types";

interface DataProps {
  event?: SystemEvent;
  eventData: Pick<
    SystemEvent,
    "title" | "description" | "startDate" | "finishDate"
  >;
}

interface OmxSearchBoxProps {
  event?: SystemEvent;
  isLoading?: boolean;
  onConfirm: (data: DataProps) => void;
  onCancel: () => void;
}

const DESCRIPTION_CHAR_LIMIT = 128;

const getDatePickerInputs = (formCreator: ReturnType<typeof useDateForm>) => {
  const dateUnits: {
    placeholder: string;
    dispatch: (value: number) => void;
    value: number | null;
    min?: number;
    max?: number;
  }[] = [
    {
      placeholder: "DD",
      dispatch: formCreator.actions.setDay,
      value: formCreator.state.day,
      min: 1,
      max: 31,
    },
    {
      placeholder: "MM",
      dispatch: formCreator.actions.setMonth,
      value: formCreator.state.month,
      min: 1,
      max: 12,
    },
    {
      placeholder: "YYYY",
      dispatch: formCreator.actions.setYear,
      value: formCreator.state.year,
      min: CURRENT_YEAR,
      max: 9999,
    },
    {
      placeholder: "HH",
      dispatch: formCreator.actions.setHour,
      value: formCreator.state.hour,
      min: 0,
      max: 23,
    },
    {
      placeholder: "MM",
      dispatch: formCreator.actions.setMinute,
      value: formCreator.state.minute,
      min: 0,
      max: 59,
    },
  ];

  const elements = dateUnits.map((unit) => (
    <S.Input
      type="number"
      placeholder={unit.placeholder}
      max={unit.max}
      min={unit.min}
      $paddingLeft={5}
      $paddingRight={0}
      value={(unit.value as any) ?? ""}
      onChange={(ev) => {
        const value = parseInt(ev?.target?.value);
        unit.dispatch((isNaN(value) ? null : value) as number);
      }}
    />
  ));
  return [elements.slice(0, 3), elements.slice(3)];
};

export const OmxEventForm: React.FC<OmxSearchBoxProps> = function ({
  event,
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const startDate = useDateForm(
    event
      ? getDateInfo(event.startDate)
      : {
          hour: 10,
          minute: 0,
        }
  );
  const finishDate = useDateForm(
    event
      ? getDateInfo(event.finishDate)
      : {
          hour: 14,
          minute: 0,
        }
  );
  const notify = useToast();

  const [descriptionValue, setDescriptionValue] = useState(
    event?.description ?? ""
  );

  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelRef = useRef<typeof onCancel>();
  const clickedRef = useRef<boolean>(false);

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

  const DatePickerInputs = useMemo(() => {
    return {
      start: getDatePickerInputs(startDate),
      finish: getDatePickerInputs(finishDate),
    };
  }, [startDate, finishDate]);

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
            startDate: startDate.resultDate,
            finishDate: finishDate.resultDate,
          },
        };

        if (
          [
            resultData.eventData.title,
            resultData.eventData.description,
            startDate.valid,
            finishDate.valid,
          ].every(Boolean)
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
          <S.DateInputGroup>{DatePickerInputs.start[0]}</S.DateInputGroup>
          <S.DateInputGroup>{DatePickerInputs.start[1]}</S.DateInputGroup>
        </S.DateInputGroupWrapper>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.DateInputLabel>Término</S.DateInputLabel>
        <S.DateInputGroupWrapper>
          <S.DateInputGroup>{DatePickerInputs.finish[0]}</S.DateInputGroup>
          <S.DateInputGroup>{DatePickerInputs.finish[1]}</S.DateInputGroup>
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
