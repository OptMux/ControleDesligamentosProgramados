import * as S from "./AccountDropdown.Styles";
import UserAvatarImg from "../../../../../assets/icons/userAvatar.svg";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ChevronDown16Filled } from "@fluentui/react-icons";
import { colors } from "../../../../../enums/colors";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { UserActions } from "../../../../../store/ducks/user/user";

export const AccountDropdown: React.FC = function () {
  const { user } = useTypedSelector(({ user }) => ({ user }));
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(UserActions.logout());
  }, [dispatch]);

  return (
    <S.Wrapper>
      <S.Container $meta="omx-dropdown">
        <S.UserAvatar src={UserAvatarImg} draggable={false} />
        <S.UserName>{user.loggedUser?.username}</S.UserName>
        <S.ChevronIconWrapper>
          <ChevronDown16Filled color={colors.black} />
        </S.ChevronIconWrapper>
        <S.Dropdown className="omx-dropdown">
          <S.DropdownItem onClick={logout}>Sair</S.DropdownItem>
        </S.Dropdown>
      </S.Container>
    </S.Wrapper>
  );
};
