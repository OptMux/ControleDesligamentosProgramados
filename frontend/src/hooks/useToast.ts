import { useContext } from "react";
import { ToastContext } from "../components/ToastProvider/ToastProvider";

export function useToast() {
  return useContext(ToastContext);
}
