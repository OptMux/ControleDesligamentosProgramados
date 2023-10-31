import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./OmxEventExceptionForm.Styles";
import { useToast } from "../../hooks/useToast";
import { ToastStatus } from "../../hooks/useToastPrivate";
import DatePicker from "react-datepicker";
import { EventException } from "../../store/ducks/eventExceptions/eventExceptions.types";

interface DataProps {
  eventException?: EventException;
  eventExceptionData: Pick<EventException, "description" | "date">;
}

interface OmxEventExceptionFormProps {
  eventException?: EventException;
  isLoading?: boolean;
  onConfirm: (data: DataProps) => void;
  onCancel: () => void;
}

const DESCRIPTION_CHAR_LIMIT = 128;

export const OmxEventExceptionForm: React.FC<OmxEventExceptionFormProps> =
  function ({ eventException, isLoading = false, onConfirm, onCancel }) {
    const notify = useToast();

    const [date, setDate] = useState(
      eventException?.date ? new Date(eventException?.date) : new Date()
    );

    const [descriptionValue, setDescriptionValue] = useState(
      eventException?.description ?? ""
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

          let newDate: Date | null = null;
          if (date) {
            newDate = new Date(date);
            newDate.setHours(23, 59, 59);
          }

          const resultData: DataProps = {
            eventException,
            eventExceptionData: {
              description: data.get("description") as string,
              date: newDate as Date,
            },
          };

          if (
            [resultData.eventExceptionData.description, newDate].every(Boolean)
          )
            return onConfirm?.(resultData);

          return notify({
            id: "omxEventExceptionFormValidationError",
            title: "Erro de validação",
            body: "Preencha todos os campos",
            status: ToastStatus.error,
          });
        }}
      >
        <S.InputWrapper>
          <S.Input
            ref={inputRef}
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
          <S.DateInputLabel>Data</S.DateInputLabel>
          <S.DateInputGroupWrapper>
            <S.DateInputGroup>
              <DatePicker
                selected={date}
                locale="pt-BR"
                dateFormat="P"
                onCalendarOpen={onCalendarOpen}
                onCalendarClose={onCalendarClose}
                onChange={(date) => setDate(date as Date)}
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
          <S.Button type="submit">
            {eventException ? "Editar" : "Adicionar"}
          </S.Button>
        </S.ButtonGroup>
      </S.WrapperForm>
    );
  };
