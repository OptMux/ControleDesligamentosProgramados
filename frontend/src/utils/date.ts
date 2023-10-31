export function dateFactory(
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number
) {
  const date = new Date();
  if (hours !== undefined) date.setHours(hours);
  if (minutes !== undefined) date.setMinutes(minutes);
  if (seconds !== undefined) date.setSeconds(seconds);
  if (ms !== undefined) date.setMilliseconds(ms);
  return date;
}
