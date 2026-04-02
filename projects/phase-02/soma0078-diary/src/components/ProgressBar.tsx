import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { flex: progress }]} />
        <View style={{ flex: 100 - progress }} />
      </View>
      <Text style={styles.text}>
        {current} / {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  barContainer: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
    flexDirection: "row",
  },
  barFill: {
    height: 6,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
});
