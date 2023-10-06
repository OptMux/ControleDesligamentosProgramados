import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const useTypedSelector: TypedUseSelectorHook<RootState> = (
  selector,
  ...rest: any
) =>
  useSelector(
    createSelector([(state) => state], (state) => selector?.(state)),
    ...rest
  );
