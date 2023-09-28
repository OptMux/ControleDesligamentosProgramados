import { SystemEvent } from "../store/ducks/events/events.types";
import { withAuth } from "./api";
import { ApiRoutes } from "./apiRoutes";

const DEFAULT_EVENT_LIMIT = 10;
const DEFAULT_FETCH_ACTIVE_EVENTS = true;

export async function getEvents(
  limit = DEFAULT_EVENT_LIMIT,
  onlyActive = DEFAULT_FETCH_ACTIVE_EVENTS,
  search?: string,
  paginationParams?: string
): Promise<{ events: SystemEvent[]; params?: string }> {
  const params =
    paginationParams ??
    new URLSearchParams({
      limit: limit?.toString?.() ?? DEFAULT_EVENT_LIMIT,
      onlyActive: onlyActive?.toString?.() ?? DEFAULT_FETCH_ACTIVE_EVENTS,
      search: (search as string) || "",
    }).toString();

  const route: string[] = [ApiRoutes.getEvents];
  if (params) route.push(params);
  try {
    const {
      data: { data, nextPage },
    } = await withAuth.get(route.join("?"));
    return { events: data?.events ?? [], params: nextPage };
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "get events error");
  }
}

export async function updateEvent(
  id: SystemEvent["id"],
  eventData: Partial<Omit<SystemEvent, "id" | "startedAt" | "finishedAt">>
): Promise<SystemEvent> {
  try {
    const {
      data: { data },
    } = await withAuth.put(`${ApiRoutes.updateEvent}/${id}`, eventData);
    return data?.event;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "update event error");
  }
}

export async function deleteEvent(id: SystemEvent["id"]): Promise<void> {
  try {
    await withAuth.delete(`${ApiRoutes.updateEvent}/${id}`);
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "update event error");
  }
}
