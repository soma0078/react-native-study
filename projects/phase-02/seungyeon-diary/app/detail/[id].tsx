import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, MOOD_OPTIONS, RADIUS, SPACING, WEATHER_OPTIONS } from "@/constants/theme";
import { useDiaries } from "@/hooks/useDiaries";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById } = useDiaries();
  const entry = getById(id);

  const backScale = useRef(new Animated.Value(1)).current;

  const handleBackPressIn = () => {
    Animated.spring(backScale, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleBackPressOut = () => {
    Animated.spring(backScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  if (!entry) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundText}>일기를 찾을 수 없어요.</Text>
          <Pressable onPress={handleBack} style={styles.notFoundBack}>
            <Text style={styles.notFoundBackText}>← 돌아가기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const weatherInfo = WEATHER_OPTIONS.find((w) => w.value === entry.weather);
  const moodInfo = MOOD_OPTIONS.find((m) => m.value === entry.mood);

  const dateObj = new Date(entry.date);
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[dateObj.getDay()];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: backScale }] }}>
          <Pressable
            onPress={handleBack}
            onPressIn={handleBackPressIn}
            onPressOut={handleBackPressOut}
            style={styles.backButton}
            hitSlop={12}
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>
        </Animated.View>
        <Text style={styles.headerLabel}>일기 상세</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateRow}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.dayOfWeek}>{dayOfWeek}요일</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaIcon}>{weatherInfo?.icon}</Text>
            <Text style={styles.metaLabel}>{weatherInfo?.label}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaChip}>
            <Text style={styles.metaIcon}>{moodInfo?.icon}</Text>
            <Text style={styles.metaLabel}>기분 {entry.mood}점</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.content}>{entry.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 22,
    color: COLORS.text,
  },
  headerLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.sm,
  },
  date: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },
  dayOfWeek: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  metaIcon: {
    fontSize: 18,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 28,
  },
  content: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 28,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
  },
  notFoundEmoji: {
    fontSize: 48,
  },
  notFoundText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  notFoundBack: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
  },
  notFoundBackText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
