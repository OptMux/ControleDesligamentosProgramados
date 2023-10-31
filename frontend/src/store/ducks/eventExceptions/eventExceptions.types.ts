export interface EventException {
  id: string;
  description: string;
  date: Date;
}

export interface EventExceptionsSliceState {
  eventExceptions: EventException[];
  isLoading: boolean;
  isLoadingPages: boolean;
  pageParams?: string;
  eventExceptionsInLoading: {
    [K: EventException["id"]]: boolean;
  };
}
