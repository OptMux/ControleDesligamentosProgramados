import { PayloadAction } from "@reduxjs/toolkit";
import { useCallback, useMemo, useReducer } from "react";

export const CURRENT_YEAR: number = new Date()?.getFullYear?.();

enum ActionTypes {
  setDay = "setDay",
  setMonth = "setMonth",
  setYear = "setYear",
  setHour = "setHour",
  setMinute = "setMinute",
}
interface DateReducerState {
  day: number | null;
  month: number | null;
  year: number | null;
  hour: number | null;
  minute: number | null;
}

type ReducerType = (
  state: DateReducerState,
  action: PayloadAction<number | null, ActionTypes>
) => DateReducerState;

function capNumber(num: number, min: number, max: number) {
  if (num === undefined || num === null) return num;
  if (num > max) return max;
  else if (num < min) return min;
  return num;
}

export function getDateInfo(date: number | Date): DateReducerState {
  const currentDate = new Date(date);
  return {
    day: currentDate.getDate() ?? 1,
    month: (currentDate.getMonth() ?? 0) + 1,
    year: currentDate.getFullYear() ?? CURRENT_YEAR,
    hour: currentDate.getHours() ?? 0,
    minute: currentDate.getMinutes() ?? 0,
  };
}

export function useDateForm(initialData: Partial<DateReducerState> = {}) {
  const [state, dispatch] = useReducer<ReducerType>(
    (state, action) => {
      switch (action.type) {
        case ActionTypes.setDay:
          return {
            ...state,
            day: capNumber(action.payload as number, 1, 31),
          };
        case ActionTypes.setMonth:
          return {
            ...state,
            month: capNumber(action.payload as number, 1, 12),
          };
        case ActionTypes.setYear:
          return {
            ...state,
            year: capNumber(action.payload as number, CURRENT_YEAR, 9999),
          };
        case ActionTypes.setHour:
          return {
            ...state,
            hour: capNumber(action.payload as number, 0, 23),
          };
        case ActionTypes.setMinute:
          return {
            ...state,
            minute: capNumber(action.payload as number, 0, 59),
          };
        default:
          return state;
      }
    },
    {
      day: null,
      month: null,
      year: CURRENT_YEAR,
      hour: null,
      minute: null,
      ...initialData,
    }
  );

  const resultDate = useMemo(() => {
    const date = new Date();
    date.setDate(state.day ?? 1);
    date.setMonth((state.month ?? 1) - 1);
    date.setFullYear(state.year ?? CURRENT_YEAR);
    date.setHours(state.hour ?? 0);
    date.setMinutes(state.minute ?? 0);
    return date;
  }, [state]);

  const valid = useMemo(
    () =>
      Object.values(state).every(
        (value) => value !== undefined && value !== null
      ),
    [state]
  );

  const setDay = useCallback(
    (value: number | null) =>
      dispatch({ type: ActionTypes.setDay, payload: value }),
    [dispatch]
  );
  const setMonth = useCallback(
    (value: number | null) =>
      dispatch({ type: ActionTypes.setMonth, payload: value }),
    [dispatch]
  );
  const setYear = useCallback(
    (value: number | null) =>
      dispatch({ type: ActionTypes.setYear, payload: value }),
    [dispatch]
  );
  const setHour = useCallback(
    (value: number | null) =>
      dispatch({ type: ActionTypes.setHour, payload: value }),
    [dispatch]
  );
  const setMinute = useCallback(
    (value: number | null) =>
      dispatch({ type: ActionTypes.setMinute, payload: value }),
    [dispatch]
  );

  return {
    state,
    resultDate,
    valid,
    actions: {
      setDay,
      setMonth,
      setYear,
      setHour,
      setMinute,
    },
  };
}
