type SchedulerCallback =
  | ((scheduler: Scheduler) => Promise<void> | void)
  | (() => Promise<void> | void);

export class Scheduler {
  private started = false;
  private interval: NodeJS.Timeout | undefined;
  private intervalInMinutes: number = 1;
  private callback: SchedulerCallback | undefined;

  constructor(callback: SchedulerCallback, intervalInMinutes = 1) {
    this.callback = callback;
    this.intervalInMinutes = intervalInMinutes;
  }

  get isStarted() {
    return this.started;
  }

  private async notifyCallback() {
    this.callback?.(this)?.catch?.((err) => console.error(err));
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.notifyCallback();
    clearInterval(this.interval);
    this.interval = setInterval(
      () => this.started && this.notifyCallback?.(),
      this.intervalInMinutes * 60000
    );
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    clearInterval(this.interval);
  }
}
