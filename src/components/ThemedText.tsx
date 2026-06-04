import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  type?: 'labelTitle' | 'labelValue' | 'statTitle' | 'statValue' | "button";
};

export function ThemedText({
  style,
  type = 'labelTitle',
  ...rest
}: ThemedTextProps) {
  let textType: "text" | "textLight" | "textWhite";
  switch (type) {
    case "button":
      textType = "textWhite";
      break;
    case "labelTitle":
    case "statTitle":
      textType = "text";
      break;
    default:
      textType = "textLight";
  }
  const color = useThemeColor(textType);

  return (
    <Text
      style={[
        {
          color,
          fontFamily: "Open Sans",
        },
        type === 'labelTitle' ? styles.labelTitle : undefined,
        type === 'labelValue' ? styles.labelValue : undefined,
        type === 'statTitle' ? styles.statTitle : undefined,
        type === 'statValue' ? styles.statValue : undefined,
        type === 'button' ? styles.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  labelTitle: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 28,
  },
  labelValue: {
    fontSize: 25,
    fontWeight: "300",
  },
  statTitle: {
    fontSize: 11,
    fontWeight: "400",
  },
  statValue: {
    fontSize: 35,
    fontWeight: "300",
    textAlign: "center",
  },
  button: {
    fontSize: 15,
    fontWeight: "600",
  }
});
