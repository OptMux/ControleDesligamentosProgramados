import * as S from "./TopBar.Styles";
import LogoImg from "../../../../assets/img/logo_minimal.svg";
import { AccountDropdown } from "./AccountDropdown/AccountDrodown";
import { useEffect } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

export const TopBar: React.FC = function () {
  const { user } = useTypedSelector(({ user }) => ({ user }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedUser) navigate("/");
  }, [user.loggedUser, navigate]);

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
