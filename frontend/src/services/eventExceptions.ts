import { EventException } from "../store/ducks/eventExceptions/eventExceptions.types";
import { withAuth } from "./api";
import { ApiRoutes } from "./apiRoutes";

const DEFAULT_EVENT_LIMIT = 10;

export async function getEventExceptions(
  limit = DEFAULT_EVENT_LIMIT,
  search?: string,
  paginationParams?: string
): Promise<{ eventExceptions: EventException[]; params?: string }> {
  const params =
    paginationParams ??
    new URLSearchParams({
      limit: limit?.toString?.() ?? DEFAULT_EVENT_LIMIT,
      search: (search as string) || "",
    }).toString();

  const route: string[] = [ApiRoutes.getEventExceptions];
  if (params) route.push(params);
  try {
    const {
      data: { data, nextPage },
    } = await withAuth.get(route.join("?"));
    return { eventExceptions: data?.eventExceptions ?? [], params: nextPage };
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message ?? "get event exceptions error"
    );
  }
}

export async function createEventException(
  eventExceptionData: Pick<EventException, "description" | "date">
): Promise<EventException> {
  try {
    const {
      data: { data },
    } = await withAuth.post(ApiRoutes.createEventException, eventExceptionData);
    return data?.eventException;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message ?? "create event exception error"
    );
  }
}

export async function deleteEventException(
  id: EventException["id"]
): Promise<void> {
  try {
    await withAuth.delete(`${ApiRoutes.deleteEventException}/${id}`);
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message ?? "delete event exception error"
    );
  }
}
