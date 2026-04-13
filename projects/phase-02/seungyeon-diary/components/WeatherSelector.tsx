import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACING, WEATHER_OPTIONS } from "@/constants/theme";
import type { Weather } from "@/types/diary";

interface WeatherSelectorProps {
  value: Weather | null;
  onChange: (weather: Weather) => void;
}

function WeatherItem({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
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
        <Text style={styles.icon}>{icon}</Text>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function WeatherSelector({ value, onChange }: WeatherSelectorProps) {
  return (
    <View style={styles.container}>
      {WEATHER_OPTIONS.map((opt) => (
        <WeatherItem
          key={opt.value}
          icon={opt.icon}
          label={opt.label}
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
    gap: SPACING.sm,
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
  },
  itemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    marginTop: SPACING.xs,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  labelSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
