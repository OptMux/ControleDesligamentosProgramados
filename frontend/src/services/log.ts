import { SystemLog } from "../store/ducks/logs/logs.types";
import { withAuth } from "./api";
import { ApiRoutes } from "./apiRoutes";

const DEFAULT_LOG_LIMIT = 20;
const DEFAULT_LOG_CHUNKS = 1;

export async function getLogs(
  limit = DEFAULT_LOG_LIMIT,
  paginationParams?: string
): Promise<{ logs: SystemLog[]; params?: string }> {
  const params =
    paginationParams ??
    new URLSearchParams({
      limit: limit?.toString?.() ?? DEFAULT_LOG_LIMIT,
    }).toString();

  const route: string[] = [ApiRoutes.getLogs];
  if (params) route.push(params);
  try {
    const {
      data: { data, nextPage },
    } = await withAuth.get(route.join("?"));
    return { logs: data?.logs ?? [], params: nextPage };
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "get logs error");
  }
}

export async function getAllLogs(
  chunks = DEFAULT_LOG_CHUNKS,
  reversed = false
): Promise<SystemLog[]> {
  const resultLogs: SystemLog[] = [];
  let currentParams: string | undefined = reversed
    ? new URLSearchParams({
        order: "asc",
      }).toString()
    : undefined;
  do {
    const newLogs = await getLogs(chunks, currentParams);
    resultLogs.push(...newLogs.logs);
    currentParams = newLogs.params;
  } while (currentParams);
  return resultLogs;
}
