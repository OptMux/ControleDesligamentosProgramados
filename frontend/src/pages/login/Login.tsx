import * as S from "./Login.Styles";
import LogoImg from "../../assets/img/logo.svg";
import { OmxInput } from "../../components/OmxInput/OmxInput";
import { useCallback, useState } from "react";
import { OmxMainButton } from "../../components/OmxMainButton/OmxMainButton";

export const LoginPage = function () {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(() => {
    alert(`${userName} ${password}`);
    setUserName("");
    setPassword("");
  }, [userName, password, setUserName, setPassword]);

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
            value={userName}
            onInput={setUserName}
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
        <OmxMainButton text="login" />
      </S.FormWrapper>
    </S.Wrapper>
  );
};
