import { PayloadAction } from "@reduxjs/toolkit";
import { useCallback, useReducer } from "react";

enum ActionTypes {
  setIsOpened = "setIsOpened",
}

interface AccordionReducerState<T> {
  isOpenedMap: Map<T, boolean>;
}

type ReducerType<T> = (
  state: AccordionReducerState<T>,
  action: PayloadAction<any, ActionTypes>
) => AccordionReducerState<T>;

export function useAccordion<T>() {
  const [state, dispatch] = useReducer<ReducerType<T>>(
    (state, action) => {
      return {
        [ActionTypes.setIsOpened]: () => {
          const { id, value } = action.payload;
          const newMap = new Map(state.isOpenedMap);
          newMap.set(id, value ?? !state.isOpenedMap.get(id));
          return {
            ...state,
            isOpenedMap: newMap,
          };
        },
      }[action.type]();
    },
    {
      isOpenedMap: new Map<T, boolean>(),
    }
  );

  const setIsOpen = useCallback(
    (id: T, value?: boolean) => {
      dispatch({
        type: ActionTypes.setIsOpened,
        payload: {
          id,
          value,
        },
      });
    },
    [dispatch]
  );

  return {
    accordionItems: state.isOpenedMap,
    setIsOpen,
  };
}
