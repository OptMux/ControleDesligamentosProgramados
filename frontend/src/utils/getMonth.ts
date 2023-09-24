import { Month } from "../enums/months";

const MONTH_ORDER: Month[] = [
  Month.janeiro,
  Month.fevereiro,
  Month.março,
  Month.abril,
  Month.maio,
  Month.junho,
  Month.julho,
  Month.agosto,
  Month.setembro,
  Month.outubro,
  Month.novembro,
  Month.dezembro,
];

export function getMonth(date: Date | number): Month {
  const currentdate = new Date(date);
  const monthIndex = currentdate.getMonth();
  return MONTH_ORDER[monthIndex];
}
