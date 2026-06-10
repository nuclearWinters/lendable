import { render, screen } from '@testing-library/react-native';
import { LabelRow } from '../components/LabelRow';

describe('LabelRow', () => {
  it('renders label and value', () => {
    render(<LabelRow label="Loan amount" value="£7,500" />);
    expect(screen.getByText('Loan amount')).toBeTruthy();
    expect(screen.getByText('£7,500')).toBeTruthy();
  });

  it('renders both texts in a row', () => {
    const { getByText } = render(<LabelRow label="Term" value="3 years" />);
    expect(getByText('Term')).toBeTruthy();
    expect(getByText('3 years')).toBeTruthy();
  });

  it('updates when props change', () => {
    const { rerender, getByText } = render(
      <LabelRow label="Amount" value="£1,000" />
    );
    rerender(<LabelRow label="Amount" value="£5,000" />);
    expect(getByText('£5,000')).toBeTruthy();
  });

  it('has a combined accessibility label', () => {
    render(<LabelRow label="I want to borrow" value="£7,500" />);
    expect(screen.getByLabelText('I want to borrow £7,500')).toBeTruthy();
  });
});
