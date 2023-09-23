import { styled } from "styled-components";
import { colors } from "../../enums/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: ${colors.blue};
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  max-width: 340px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 195px;
  height: 48px;
  margin: 10px;
  user-select: none;
`;

export const BottomText = styled.span`
  position: absolute;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${colors.tWhite};
  bottom: 32px;
  left: 50%;
  transform: translate(-50%);
`;
