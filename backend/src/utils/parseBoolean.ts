export function parseBoolean(value: string) {
  return {
    true: true,
    false: false,
  }[value?.toLowerCase?.() ?? "false"];
}
