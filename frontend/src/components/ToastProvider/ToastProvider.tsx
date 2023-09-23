import { PropsWithChildren, createContext } from "react";
import { useToastPrivate } from "../../hooks/useToastPrivate";
import { Toaster } from "@fluentui/react-components";

export const ToastContext = createContext<
  ReturnType<typeof useToastPrivate>["notify"]
>(() => {});

export const ToastProvider: React.FC<PropsWithChildren> = function ({
  children,
}) {
  const { notify, id } = useToastPrivate();

  return (
    <>
      <ToastContext.Provider value={notify}>{children}</ToastContext.Provider>
      <Toaster toasterId={id} />
    </>
  );
};
