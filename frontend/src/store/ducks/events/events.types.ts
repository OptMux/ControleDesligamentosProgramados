export interface SystemEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

export interface EventsSliceState {
  events: SystemEvent[];
  isLoading: boolean;
  isLoadingPages: boolean;
  pageParams?: string;
  eventsInLoading: {
    [K: SystemEvent["id"]]: boolean;
  };
}
