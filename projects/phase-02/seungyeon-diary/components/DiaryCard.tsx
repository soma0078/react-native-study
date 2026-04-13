import * as Haptics from "expo-haptics";
import { useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, MOOD_OPTIONS, RADIUS, SPACING, WEATHER_OPTIONS } from "@/constants/theme";
import type { DiaryEntry } from "@/types/diary";

interface DiaryCardProps {
  entry: DiaryEntry;
  onPress: () => void;
  onDelete: () => void;
}

const DELETE_THRESHOLD = -80;
const SWIPE_LIMIT = -100;

export function DiaryCard({ entry, onPress, onDelete }: DiaryCardProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const deleteOpacity = translateX.interpolate({
    inputRange: [SWIPE_LIMIT, DELETE_THRESHOLD, 0],
    outputRange: [1, 0.6, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dy) < 20,
      onPanResponderMove: (_, gestureState) => {
        const clamped = Math.max(SWIPE_LIMIT, Math.min(0, gestureState.dx));
        translateX.setValue(clamped);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < DELETE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: SWIPE_LIMIT,
            duration: 150,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
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

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Animated.timing(translateX, {
      toValue: -400,
      duration: 200,
      useNativeDriver: true,
    }).start(onDelete);
  };

  const weatherInfo = WEATHER_OPTIONS.find((w) => w.value === entry.weather);
  const moodInfo = MOOD_OPTIONS.find((m) => m.value === entry.mood);

  const dateObj = new Date(entry.date);
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.deleteArea, { opacity: deleteOpacity }]}>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>삭제</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={{ transform: [{ translateX }, { scale: pressScale }] }}
        {...panResponder.panHandlers}
      >
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
    alignItems: "flex-end",
    paddingRight: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.danger,
    minWidth: 100,
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
