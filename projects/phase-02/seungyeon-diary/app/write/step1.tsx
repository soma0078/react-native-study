import * as Haptics from "expo-haptics";
import { router } from "expo-router";
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
import { MoodSelector } from "@/components/MoodSelector";
import { ProgressBar } from "@/components/ProgressBar";
import { WeatherSelector } from "@/components/WeatherSelector";
import { COLORS, MOOD_OPTIONS, RADIUS, SPACING, WEATHER_OPTIONS } from "@/constants/theme";
import { useWriteForm } from "./_layout";

export default function Step1() {
  const { form, setWeather, setMood } = useWriteForm();
  const isValid = form.weather !== null && form.mood !== null;

  const nextScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!isValid) return;
    Animated.spring(nextScale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(nextScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleNext = () => {
    if (!isValid) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/write/step2");
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const dateObj = new Date(form.date);
  const displayDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  const weatherLabel = WEATHER_OPTIONS.find((w) => w.value === form.weather)?.label;
  const moodLabel = MOOD_OPTIONS.find((m) => m.value === form.mood)?.label;

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={1} total={2} />

      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>기본 정보</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>📅 날짜</Text>
          <View style={styles.dateChip}>
            <Text style={styles.dateText}>{displayDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            🌤 날씨
            {form.weather && (
              <Text style={styles.selectedHint}> — {weatherLabel}</Text>
            )}
          </Text>
          <WeatherSelector value={form.weather} onChange={setWeather} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            😊 오늘의 기분
            {form.mood && (
              <Text style={styles.selectedHint}> — {moodLabel}</Text>
            )}
          </Text>
          <MoodSelector value={form.mood} onChange={setMood} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Animated.View
          style={[styles.nextButtonWrapper, { transform: [{ scale: nextScale }] }]}
        >
          <Pressable
            onPress={handleNext}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={!isValid}
            style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          >
            <Text
              style={[
                styles.nextButtonText,
                !isValid && styles.nextButtonTextDisabled,
              ]}
            >
              다음
            </Text>
          </Pressable>
        </Animated.View>
      </View>
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    gap: SPACING.xl,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  selectedHint: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
  dateChip: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  nextButtonWrapper: {
    width: "100%",
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
  nextButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});
