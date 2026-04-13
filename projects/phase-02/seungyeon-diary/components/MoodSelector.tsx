import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, MOOD_OPTIONS, RADIUS, SPACING } from "@/constants/theme";
import type { Mood } from "@/types/diary";

interface MoodSelectorProps {
  value: Mood | null;
  onChange: (mood: Mood) => void;
}

function MoodItem({
  icon,
  label,
  value,
  selected,
  onPress,
}: {
  icon: string;
  label: string;
  value: Mood;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.item, selected && styles.itemSelected]}
      >
        <Text style={[styles.icon, selected && styles.iconSelected]}>
          {icon}
        </Text>
        <Text style={[styles.score, selected && styles.scoreSelected]}>
          {value}점
        </Text>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      {MOOD_OPTIONS.map((opt) => (
        <MoodItem
          key={opt.value}
          icon={opt.icon}
          label={opt.label}
          value={opt.value}
          selected={value === opt.value}
          onPress={() => onChange(opt.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.xs,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minWidth: 60,
  },
  itemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  icon: {
    fontSize: 24,
  },
  iconSelected: {
    fontSize: 28,
  },
  score: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  scoreSelected: {
    color: COLORS.primary,
  },
  label: {
    marginTop: 2,
    fontSize: 9,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  labelSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
