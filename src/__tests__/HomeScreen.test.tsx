import { act, fireEvent, render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import { DEFAULT_LOAN_AMOUNT, DEFAULT_LOAN_TERM } from '../constants/calculator';
import { calcMonthlyRepayment, getInterestRate, poundsFormatter, poundsFormatterWhole } from '../utils/calculator';

// ── Mocks ──────────────────────────────────────────────────────────────────

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, style }: any) => <View style={style}>{children}</View>,
  };
});

jest.mock('expo-secure-store', () => ({
  getItem: jest.fn(() => null),
  setItemAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style }: any) => <View style={style}>{children}</View>,
  };
});

// ── Helpers ────────────────────────────────────────────────────────────────

const getAmountSlider = () => screen.getByTestId('loan-amount-slider');
const getTermSlider = () => screen.getByTestId('loan-term-slider');

// ── Tests ──────────────────────────────────────────────────────────────────

describe('HomeScreen', () => {
  beforeEach(() => {
    render(<HomeScreen />);
  });

  it('renders the borrow label', () => {
    expect(screen.getByText('I want to borrow')).toBeTruthy();
  });

  it('renders the over label', () => {
    expect(screen.getByText('over')).toBeTruthy();
  });

  it('renders the CTA button', () => {
    expect(screen.getByText('Get your quote »')).toBeTruthy();
  });

  it('shows default loan amount on load', () => {
    expect(
      screen.getByText(poundsFormatter.format(DEFAULT_LOAN_AMOUNT))
    ).toBeTruthy();
  });

  it('shows default interest rate on load', () => {
    const rate = getInterestRate(DEFAULT_LOAN_AMOUNT);
    expect(screen.getByText(`${rate}%`)).toBeTruthy();
  });

  it('shows default monthly repayment on load', () => {
    const rate = getInterestRate(DEFAULT_LOAN_AMOUNT);
    const months = DEFAULT_LOAN_TERM * 6;
    const repayment = calcMonthlyRepayment(DEFAULT_LOAN_AMOUNT, months, rate);
    expect(
      screen.getByText(poundsFormatterWhole.format(repayment))
    ).toBeTruthy();
  });

  it('updates loan amount when slider changes', () => {
    act(() => {
      fireEvent(getAmountSlider(), 'onValueChange', 10000);
    });
    expect(screen.getByText(poundsFormatter.format(10000))).toBeTruthy();
  });

  it('updates interest rate when loan amount changes', () => {
    act(() => {
      fireEvent(getAmountSlider(), 'onValueChange', 10000);
    });
    expect(screen.getByText(`${getInterestRate(10000)}%`)).toBeTruthy();
  });

  it('updates term label when term slider changes', () => {
    act(() => {
      fireEvent(getTermSlider(), 'onValueChange', 4); // 2 years
    });
    expect(screen.getByText('2 years')).toBeTruthy();
  });

  it('shows singular "year" for exactly 1 year', () => {
    act(() => {
      fireEvent(getTermSlider(), 'onValueChange', 2); // 1 year
    });
    expect(screen.getByText('1 year')).toBeTruthy();
  });

  it('shows half-year fraction in term label', () => {
    act(() => {
      fireEvent(getTermSlider(), 'onValueChange', 3); // 1½ years
    });
    expect(screen.getByText('1½ years')).toBeTruthy();
  });

  it('persists loan amount on slide complete', async () => {
    const SecureStore = require('expo-secure-store');
    await act(async () => {
      fireEvent(getAmountSlider(), 'onSlidingComplete', 12000);
    });
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'loanAmount',
      '12000'
    );
  });

  it('persists loan term on slide complete', async () => {
    const SecureStore = require('expo-secure-store');
    await act(async () => {
      fireEvent(getTermSlider(), 'onSlidingComplete', 8);
    });
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'loanTerm',
      '8'
    );
  });
});
