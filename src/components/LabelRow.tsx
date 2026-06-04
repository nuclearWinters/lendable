import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = { label: string; value: string };

export function LabelRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <ThemedText type="labelTitle">{label}</ThemedText>
      <ThemedText type="labelValue">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 6,
  },
});
