export function filterData<T, K extends keyof T>(
  data: T,
  props: K[],
  removeUndefined = true
): Pick<T, K> {
  const newData: Pick<T, K> = {} as any;
  for (const key of props) {
    const value = data[key];
    if (removeUndefined && value === undefined) continue;
    newData[key] = value;
  }
  return newData;
}
