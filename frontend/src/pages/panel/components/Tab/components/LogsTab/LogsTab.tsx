import * as PS from "../../Tab.Styles";
import * as S from "./LogsTab.Styles";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { formatDate } from "../../../../../../utils/format";

export const LogsTab: React.FC = function () {
  const { logs } = useTypedSelector(({ logs }) => ({ logs }));

  return (
    <>
      <PS.TabTitle>logs</PS.TabTitle>
      <S.Wrapper>
        <S.LogoWrapper>
          {logs.logs?.map?.((log) => (
            <S.LogText key={log.id}>{`[${formatDate(
              log.date,
              "DD/MM/YY | HH:mm"
            )}] ${log.source}: ${log.message}`}</S.LogText>
          ))}
        </S.LogoWrapper>
      </S.Wrapper>
    </>
  );
};
