type Predicate<T> = (key: keyof T, value: any) => boolean;

export function validateFields<T>(
  fields: T,
  errorName: string = "field is empty",
  predicate: Predicate<T> = (_, value) => Boolean(value)
) {
  for (const [key, value] of Object.entries(fields as any)) {
    if (!predicate(key as any, value))
      throw new Error(`error on [${key}]: ${errorName}`);
  }
  return true;
}
