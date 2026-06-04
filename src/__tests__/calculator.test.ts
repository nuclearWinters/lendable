import {
  getInterestRate,
  calcMonthlyRepayment,
  poundsFormatter,
  poundsFormatterWhole,
} from '../utils/calculator';

describe('getInterestRate', () => {
  it('returns 5% for amounts up to £4,999', () => {
    expect(getInterestRate(1000)).toBe(5);
    expect(getInterestRate(4999)).toBe(5);
  });

  it('returns 10% for amounts £5,000–£9,999', () => {
    expect(getInterestRate(5000)).toBe(10);
    expect(getInterestRate(9999)).toBe(10);
  });

  it('returns 15% for amounts £10,000–£14,999', () => {
    expect(getInterestRate(10000)).toBe(15);
    expect(getInterestRate(14999)).toBe(15);
  });

  it('returns 20% for amounts £15,000 and above', () => {
    expect(getInterestRate(15000)).toBe(20);
    expect(getInterestRate(20000)).toBe(20);
  });
});

describe('calcMonthlyRepayment', () => {
  it('returns loan/months when interest rate is 0', () => {
    expect(calcMonthlyRepayment(1200, 12, 0)).toBeCloseTo(100, 2);
  });

  it('calculates correct repayment for a standard loan', () => {
    // £7,500 over 36 months at 10% annual → ~£241.97/month
    const result = calcMonthlyRepayment(7500, 36, 10);
    expect(result).toBeCloseTo(241.97, 1);
  });

  it('calculates correct repayment for a high-rate loan', () => {
    // £15,000 over 24 months at 20% annual → ~£763.44/month
    const result = calcMonthlyRepayment(15000, 24, 20);
    expect(result).toBeCloseTo(763.44, 1);
  });

  it('returns a positive number', () => {
    expect(calcMonthlyRepayment(5000, 12, 5)).toBeGreaterThan(0);
  });
});

describe('poundsFormatter', () => {
  it('formats with pence', () => {
    expect(poundsFormatter.format(1234.5)).toBe('£1,234.50');
  });

  it('formats whole numbers with pence', () => {
    expect(poundsFormatter.format(1000)).toBe('£1,000.00');
  });
});

describe('poundsFormatterWhole', () => {
  it('formats without pence', () => {
    expect(poundsFormatterWhole.format(7500)).toBe('£7,500');
  });

  it('rounds to nearest pound', () => {
    expect(poundsFormatterWhole.format(7500.9)).toBe('£7,501');
  });
});
