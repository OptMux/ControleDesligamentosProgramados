import * as S from "./Login.Styles";
import LogoImg from "../../assets/img/logo.svg";
import { OmxInput } from "../../components/OmxInput/OmxInput";
import { useCallback, useEffect, useState } from "react";
import { OmxMainButton } from "../../components/OmxMainButton/OmxMainButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { ToastStatus } from "../../hooks/useToastPrivate";
import { useToast } from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { doLogin } from "../../store/ducks/user/userThunks";

const CURRENT_YEAR: number = new Date()?.getFullYear?.();

export const LoginPage: React.FC = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const notify = useToast();

  const navigate = useNavigate();
  const { user } = useTypedSelector(({ user }) => ({
    user,
  }));

  const onSubmit = useCallback(() => {
    if (username === "" || password === "") {
      notify({
        id: "emptyLoginError",
        title: "Erro de validação",
        body: "O login ou senha não pode(m) ser(em) vazio(s)",
        status: ToastStatus.warning,
      });
      return;
    }
    setUsername("");
    setPassword("");
    dispatch(
      doLogin({
        username,
        password,
      }) as any
    );
  }, [username, password, setUsername, setPassword, notify, dispatch]);

  useEffect(() => {
    if (user.loggedUser !== null) navigate("/panel");
  }, [user.loggedUser, navigate]);

  return (
    <S.Wrapper>
      <S.Logo src={LogoImg} draggable={false} />
      <S.FormWrapper
        onSubmit={(ev) => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <S.LoginWrapper>
          <OmxInput
            placeholder="Username"
            value={username}
            onInput={setUsername}
            fullWidth
          />
          <OmxInput
            placeholder="Password"
            value={password}
            onInput={setPassword}
            type="password"
            fullWidth
          />
        </S.LoginWrapper>
        <OmxMainButton text="login" disabled={user.isLoading} />
      </S.FormWrapper>
      <S.BottomText>Copyright {CURRENT_YEAR} © OptMux</S.BottomText>
    </S.Wrapper>
  );
};
