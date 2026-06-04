import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function AppGradient({ style, children }: Props) {
  return (
    <LinearGradient
      colors={[Colors.light.gradientOne, Colors.light.gradientTwo]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
