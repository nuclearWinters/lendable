import { Colors } from '@/constants/theme';

export function useThemeColor(
  colorName: keyof typeof Colors.light
) {
  const theme = 'light';
  return Colors[theme][colorName];
}
