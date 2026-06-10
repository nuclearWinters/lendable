import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { StatItem } from '../components/StatItem';

describe('StatItem', () => {
  it('renders value and label', () => {
    render(<StatItem value="£241.97" label="Monthly repayment" />);
    expect(screen.getByText('£241.97')).toBeTruthy();
    expect(screen.getByText('Monthly repayment')).toBeTruthy();
  });

  it('renders with different values', () => {
    render(<StatItem value="£9,000" label="Total repayable" />);
    expect(screen.getByText('£9,000')).toBeTruthy();
    expect(screen.getByText('Total repayable')).toBeTruthy();
  });

  it('updates when props change', () => {
    const { rerender, getByText } = render(
      <StatItem value="£100" label="Monthly" />
    );
    rerender(<StatItem value="£200" label="Monthly" />);
    expect(getByText('£200')).toBeTruthy();
  });

  it('has a combined accessibility label', () => {
    render(<StatItem value="10%" label="Interest rate" />);
    expect(screen.getByLabelText('Interest rate: 10%')).toBeTruthy();
  });
});
