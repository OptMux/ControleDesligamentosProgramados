export function checkHourRange(start: number, finish: number) {
  const now = new Date();
  const currentHours = now.getHours();

  if (currentHours < start) return -1;
  if (currentHours > finish) return 1;
  return 0;
}
