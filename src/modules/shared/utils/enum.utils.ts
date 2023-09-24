// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEnumValues<T>(enumType: any): T[] {
  return Object.keys(enumType).map((key: string) => enumType[key]);
}
