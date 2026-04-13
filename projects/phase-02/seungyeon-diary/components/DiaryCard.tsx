import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  COLORS,
  MOOD_OPTIONS,
  RADIUS,
  SPACING,
  WEATHER_OPTIONS,
} from "@/constants/theme";
import type { DiaryEntry } from "@/types/diary";

interface DiaryCardProps {
  entry: DiaryEntry;
  onPress: () => void;
  onDelete: () => void;
}

const DELETE_THRESHOLD = -90;
const SWIPE_LIMIT = -90;

export function DiaryCard({ entry, onPress, onDelete }: DiaryCardProps) {
  const translateX = useSharedValue(0);
  const pressScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-8, 8])
    .onUpdate((event) => {
      translateX.value = Math.max(SWIPE_LIMIT, Math.min(0, event.translationX));
    })
    .onEnd((event) => {
      if (event.translationX < DELETE_THRESHOLD) {
        translateX.value = withTiming(SWIPE_LIMIT, { duration: 200 });
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        });
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: pressScale.value }],
  }));

  const deleteAreaStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [SWIPE_LIMIT, -30, 0],
      [1, 0.5, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.97, { damping: 20, stiffness: 300 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 20, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    translateX.value = withTiming(-500, { duration: 250 });
    setTimeout(onDelete, 260);
  };

  const weatherInfo = WEATHER_OPTIONS.find((w) => w.value === entry.weather);
  const moodInfo = MOOD_OPTIONS.find((m) => m.value === entry.mood);

  const dateObj = new Date(entry.date);
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.deleteArea, deleteAreaStyle]}>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>삭제</Text>
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardStyle}>
          <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.card}
          >
            <View style={styles.header}>
              <Text style={styles.date}>{formattedDate}</Text>
              <View style={styles.badges}>
                <View style={styles.badge}>
                  <Text style={styles.badgeIcon}>{weatherInfo?.icon}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeIcon}>{moodInfo?.icon}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.title} numberOfLines={1}>
              {entry.title}
            </Text>
            <Text style={styles.content} numberOfLines={2}>
              {entry.content}
            </Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  deleteArea: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.danger,
    width: 80,
  },
  deleteButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  deleteText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    shadowColor: "#7C6FF7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  badges: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeIcon: {
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  content: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
