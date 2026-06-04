import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '../components/ThemedText';

// useThemeColor reads Colors.light directly — no mock needed
describe('ThemedText', () => {
  it('renders children', () => {
    render(<ThemedText>Hello</ThemedText>);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('defaults to labelTitle type', () => {
    render(<ThemedText>Label</ThemedText>);
    const el = screen.getByText('Label');
    expect(el.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 15, fontWeight: '400' }),
      ])
    );
  });

  it('applies statValue styles', () => {
    render(<ThemedText type="statValue">42</ThemedText>);
    const el = screen.getByText('42');
    expect(el.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 35, fontWeight: '300' }),
      ])
    );
  });

  it('applies button styles', () => {
    render(<ThemedText type="button">Click me</ThemedText>);
    const el = screen.getByText('Click me');
    expect(el.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontWeight: '600' }),
      ])
    );
  });
});
