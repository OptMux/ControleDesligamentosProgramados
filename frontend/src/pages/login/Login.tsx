import * as S from "./Login.Styles";
import LogoImg from "../../assets/img/logo.svg";
import { OmxInput } from "../../components/OmxInput/OmxInput";
import { useCallback, useState } from "react";
import { OmxMainButton } from "../../components/OmxMainButton/OmxMainButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ToastStatus } from "../../hooks/useToastPrivate";
import { useToast } from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { doLogin } from "../../store/ducks/user/userThunks";
import { OmxHead } from "../../components/OmxHead/OmxHead";

const CURRENT_YEAR: number = new Date()?.getFullYear?.();

export const LoginPage: React.FC = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const notify = useToast();

  const { user } = useTypedSelector(({ user }) => ({
    user,
  }));

  const onSubmit = useCallback(() => {
    if (username === "" || password === "") {
      notify({
        id: "emptyLoginError",
        title: "Validation error",
        body: "Username and password should not be empty",
        status: ToastStatus.warning,
      });
      return;
    }

    dispatch(
      doLogin({
        username,
        password,
        callback(err) {
          if (err)
            notify({
              id: "loginError",
              title: "Login Error",
              body: err?.message,
              status: ToastStatus.error,
            });
        },
      }) as any
    );
  }, [username, password, notify, dispatch]);

  return (
    <>
      <OmxHead title="Login" />
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
              disabled={user.isLoading}
              value={username}
              onInput={setUsername}
              fullWidth
            />
            <OmxInput
              placeholder="Password"
              disabled={user.isLoading}
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
    </>
  );
};
