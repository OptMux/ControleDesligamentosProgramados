import * as S from "./TopBar.Styles";
import LogoImg from "../../../../assets/img/logo.svg";
import { AccountDropdown } from "./AccountDropdown/AccountDrodown";

export const TopBar: React.FC = function () {
  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <S.Logo src={LogoImg} draggable={false} />
      </S.LogoWrapper>
      <S.Title>Controle de Desligamentos Programados</S.Title>
      <AccountDropdown />
    </S.Wrapper>
  );
};
