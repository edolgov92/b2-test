import { getEnumValues } from './enum.utils';

describe('getEnumValues function', () => {
  enum TestEnum {
    A = 'a',
    B = 'b',
  }

  it('should return all values of an enum', () => {
    const enumValues: TestEnum[] = getEnumValues<TestEnum>(TestEnum);
    expect(enumValues).toEqual([TestEnum.A, TestEnum.B]);
  });

  it('should return an empty array if the enum is empty', () => {
    const enumValues = getEnumValues<{}>({});
    expect(enumValues).toEqual([]);
  });
});
