export interface SystemLog {
  id: number;
  source: string;
  message: string;
  createdAt: Date;
}

export interface LogsSliceState {
  logs: SystemLog[];
  pageParams?: string;
  isLoading: boolean;
}
