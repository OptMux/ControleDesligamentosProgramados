/**
 * DD: day;
 * MM: month;
 * YY: year;
 * HH: hour;
 * mm: minute;
 * ss: seconds;
 * ms: milliseconds;
 */
export function formatDate(date: Date, pattern: string) {
  const formatDict = {
    DD: date.getDate().toString().padStart(2, "0"),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    YY: date.getFullYear().toString().padStart(4, "0"),
    HH: date.getHours().toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
    ms: date.getMilliseconds().toString(),
  };
  let currentString = `${pattern}`;
  for (const [key, value] of Object.entries(formatDict)) {
    currentString = currentString.replace(new RegExp(key, "g"), value);
  }
  return currentString;
}
