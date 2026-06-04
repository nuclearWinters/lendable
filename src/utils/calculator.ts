export const getInterestRate = (amount: number): number => {
  if (amount <= 4999) return 5;
  if (amount <= 9999) return 10;
  if (amount <= 14999) return 15;
  return 20;
};

export const calcMonthlyRepayment = (
  loanAmount: number,
  months: number,
  interestRate: number
): number => {
  const monthlyRate = interestRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / months;
  const factor = (1 + monthlyRate) ** months;
  return loanAmount * ((monthlyRate * factor) / (factor - 1));
};

export const poundsFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const poundsFormatterWhole = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});
