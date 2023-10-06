import * as PS from "../../Tab.Styles";
import * as S from "./LogsTab.Styles";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { createRef, useCallback, useEffect } from "react";
import { doGetLogs } from "../../../../../../store/ducks/logs/logsThunks";
import { Spinner } from "@fluentui/react-components";
import {
  ArrowDownload24Regular,
  ArrowSync24Regular,
} from "@fluentui/react-icons";
import {
  downloadAllLogs,
  formatLogMessage,
} from "../../../../../../utils/logs";

export const LogsTab: React.FC = function () {
  const { logs } = useTypedSelector(({ logs }) => ({ logs }));
  const dispatch = useDispatch();

  const wrapperRef = createRef<HTMLDivElement>();

  const scrollTop = useCallback(() => {
    wrapperRef.current?.scrollTo?.({
      top: 0,
    });
  }, [wrapperRef]);

  useEffect(() => {
    dispatch(doGetLogs({ ignoreState: true }) as any);
    scrollTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <S.Header>
        <PS.TabTitle>logs</PS.TabTitle>
        <S.HeaderButtonsWrapper>
          <S.Button
            onClick={() => (
              dispatch(doGetLogs({ ignoreState: true }) as any), scrollTop()
            )}
          >
            <ArrowSync24Regular />
          </S.Button>
          <S.Button onClick={() => downloadAllLogs()}>
            <ArrowDownload24Regular />
          </S.Button>
        </S.HeaderButtonsWrapper>
      </S.Header>
      <S.WrapperContainer>
        {logs.isLoading && (
          <S.LoadingContainer>
            <Spinner size="small" />
          </S.LoadingContainer>
        )}
        <S.Wrapper
          ref={wrapperRef}
          onScroll={(ev) => {
            if (!logs.pageParams) return;
            const target = ev.currentTarget;

            const scrollHeight = target?.scrollHeight - target?.offsetHeight;
            const reachedBottom = target?.scrollTop >= scrollHeight;

            if (reachedBottom) dispatch(doGetLogs({}) as any);
          }}
        >
          <S.LogoWrapper>
            {logs.logs?.map?.((log) => (
              <S.LogText key={log.id}>{formatLogMessage(log)}</S.LogText>
            ))}
          </S.LogoWrapper>
        </S.Wrapper>
      </S.WrapperContainer>
    </>
  );
};
