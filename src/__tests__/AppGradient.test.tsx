import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AppGradient } from '../components/AppGradient';
import { Colors } from '../constants/theme';

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, colors, start, end, style, ...rest }: any) => (
      <View
        testID="linear-gradient"
        style={style}
        {...rest}
        accessibilityLabel={JSON.stringify({ colors, start, end })}
      >
        {children}
      </View>
    ),
  };
});

describe('AppGradient', () => {
  it('renders children', () => {
    render(
      <AppGradient>
        <Text>Hello</Text>
      </AppGradient>
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('passes style to the gradient', () => {
    render(<AppGradient style={{ flex: 1 }} />);
    const gradient = screen.getByTestId('linear-gradient');
    expect(gradient.props.style).toEqual({ flex: 1 });
  });

  it('uses the correct brand colours', () => {
    render(<AppGradient />);
    const gradient = screen.getByTestId('linear-gradient');
    const { colors } = JSON.parse(gradient.props.accessibilityLabel);
    expect(colors).toEqual([Colors.light.gradientOne, Colors.light.gradientTwo]);
  });

  it('applies the correct gradient direction', () => {
    render(<AppGradient />);
    const gradient = screen.getByTestId('linear-gradient');
    const { start, end } = JSON.parse(gradient.props.accessibilityLabel);
    expect(start).toEqual({ x: 1, y: 0 });
    expect(end).toEqual({ x: 0, y: 1 });
  });
});
