import { dateFormatter } from '../../src/utils/date-formatter';

describe('dateFormatter', () => {
  it('should format date with BBY correctly', () => {
    expect(dateFormatter('4000BBY')).toBe('4000 BBY');
    expect(dateFormatter('0BBY')).toBe('0 BBY');
  });

  it('should format date with ABY correctly', () => {
    expect(dateFormatter('0ABY')).toBe('0 ABY');
    expect(dateFormatter('10ABY')).toBe('10 ABY');
  });

  it('should not change date if it does not contain BBY or ABY', () => {
    expect(dateFormatter('2023')).toBe('2023');
  });
});
