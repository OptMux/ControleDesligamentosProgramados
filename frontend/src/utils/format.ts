/**
 * DD: day;
 * MM: month;
 * YY: year;
 * HH: hour;
 * mm: minute;
 * ss: seconds;
 * ms: milliseconds;
 */
export function formatDate(date: Date | number, pattern: string) {
  const currentDate = new Date(date);
  const formatDict = {
    DD: currentDate.getDate().toString().padStart(2, "0"),
    MM: (currentDate.getMonth() + 1).toString().padStart(2, "0"),
    YY: currentDate.getFullYear().toString().padStart(4, "0"),
    HH: currentDate.getHours().toString().padStart(2, "0"),
    mm: currentDate.getMinutes().toString().padStart(2, "0"),
    ss: currentDate.getSeconds().toString().padStart(2, "0"),
    ms: currentDate.getMilliseconds().toString(),
  };
  let currentString = `${pattern}`;
  for (const [key, value] of Object.entries(formatDict)) {
    currentString = currentString.replace(new RegExp(key, "g"), value);
  }
  return currentString;
}
