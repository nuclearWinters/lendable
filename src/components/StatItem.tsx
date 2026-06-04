import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = { value: string; label: string };

export function StatItem({ value, label }: Props) {
  return (
    <View style={styles.item}>
      <ThemedText type="statValue">{value}</ThemedText>
      <ThemedText type="statTitle">{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
  },
});
