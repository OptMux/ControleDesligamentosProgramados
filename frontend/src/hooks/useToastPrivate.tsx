import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { useCallback } from "react";

export enum ToastStatus {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export interface ToastData {
  id: string;
  title: string;
  body?: string | JSX.Element;
  footerText?: string;
  status?: ToastStatus;
}

export function useToastPrivate() {
  const toasterId = useId("toaster");
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const notify = useCallback(
    (data: ToastData) =>
      dispatchToast(
        <Toast>
          <ToastTitle
            action={<Link onClick={() => dismissToast(data.id)}>Fechar</Link>}
          >
            {data.title}
          </ToastTitle>
          {data.body ? (
            <ToastBody subtitle={data.footerText}>{data.body}</ToastBody>
          ) : (
            ""
          )}
        </Toast>,
        {
          timeout: 4000,
          toastId: data.id,
          intent: data.status ?? "info",
        }
      ),
    [dispatchToast, dismissToast]
  );
  return { notify, id: toasterId };
}
