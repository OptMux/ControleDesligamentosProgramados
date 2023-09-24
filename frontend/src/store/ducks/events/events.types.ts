export interface SystemEvent {
  id: number;
  title: string;
  description: string;
  startDate: number;
  finishDate: number;
  startedAt?: number;
  finishedAt?: number;
}

export interface EventsSliceState {
  events: SystemEvent[];
}
