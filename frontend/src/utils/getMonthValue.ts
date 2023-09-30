import { Month } from "../enums/months";

const monthOrder: Map<Month, number> = new Map(
  [
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
  ].map((value, index) => [value, index])
);

export function getMonthValue(month: Month): number {
  return monthOrder.get(month) as number;
}
