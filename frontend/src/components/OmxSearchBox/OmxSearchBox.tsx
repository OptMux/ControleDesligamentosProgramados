import { useEffect, useRef } from "react";
import * as S from "./OmxSearchBox.Styles";

interface OmxSearchBoxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export const OmxSearchBox: React.FC<OmxSearchBoxProps> = function ({
  placeholder = "Pesquisar",
  value,
  onChange,
  onConfirm,
  onCancel,
}) {
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeRef = useRef<typeof onChange>();
  const cancelRef = useRef<typeof onCancel>();
  const clickedRef = useRef<boolean>(false);

  changeRef.current = onChange;
  cancelRef.current = onCancel;

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
        changeRef.current?.("");
        cancelRef.current?.();
      }
    };

    const keyListener = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case "Escape": {
          changeRef.current?.("");
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
      onSubmit={(ev) => {
        ev.preventDefault();
        onConfirm(value);
        onChange("");
      }}
    >
      <S.Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(ev) => {
          const target: HTMLInputElement = ev.target;
          onChange(target.value);
        }}
      />
      <S.Button type="submit">Pesquisar</S.Button>
      <S.Button
        type="button"
        $isCancel
        onClick={() => {
          onCancel();
          onChange("");
        }}
      >
        Cancelar
      </S.Button>
    </S.WrapperForm>
  );
};
