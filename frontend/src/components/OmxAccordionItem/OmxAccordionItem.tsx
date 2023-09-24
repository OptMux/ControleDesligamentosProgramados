import { PropsWithChildren } from "react";
import * as S from "./OmxAccordionItem.Styles";
import { ChevronDown20Filled, ChevronUp20Filled } from "@fluentui/react-icons";

interface OmxAccordionItemProps {
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const OmxAccordionItem: React.FC<
  PropsWithChildren<OmxAccordionItemProps>
> = function ({ title, isOpen = false, children, onClick }) {
  return (
    <S.Wrapper>
      <S.Header onClick={onClick}>
        <span>{title}</span>
        {isOpen ? <ChevronUp20Filled /> : <ChevronDown20Filled />}
      </S.Header>
      {isOpen && <S.Body>{children}</S.Body>}
    </S.Wrapper>
  );
};
