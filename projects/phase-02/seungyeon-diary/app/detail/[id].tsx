import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DatePickerField } from "@/components/DatePickerField";
import {
  COLORS,
  MOOD_OPTIONS,
  RADIUS,
  SPACING,
  WEATHER_OPTIONS,
} from "@/constants/theme";
import { useDiaries } from "@/hooks/useDiaries";
import type { Mood, Weather } from "@/types/diary";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, save } = useDiaries();
  const entry = getById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editWeather, setEditWeather] = useState<Weather | null>(null);
  const [editMood, setEditMood] = useState<Mood | null>(null);

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
    if (isEditing) {
      Alert.alert("수정 취소", "변경 사항을 저장하지 않고 나가시겠어요?", [
        { text: "계속 수정", style: "cancel" },
        {
          text: "취소하기",
          style: "destructive",
          onPress: () => setIsEditing(false),
        },
      ]);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleEditStart = () => {
    if (!entry) return;
    setEditDate(entry.date);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditWeather(entry.weather);
    setEditMood(entry.mood);
    setIsEditing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSave = async () => {
    if (!entry || !editWeather || !editMood) return;
    const trimmedTitle = editTitle.trim();
    const trimmedContent = editContent.trim();
    if (!trimmedTitle || !trimmedContent) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await save({
      ...entry,
      date: editDate,
      title: trimmedTitle,
      content: trimmedContent,
      weather: editWeather,
      mood: editMood,
    });
    setIsEditing(false);
  };

  if (!entry) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundText}>일기를 찾을 수 없어요.</Text>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            style={styles.notFoundBack}
          >
            <Text style={styles.notFoundBackText}>← 돌아가기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const currentWeather = isEditing ? editWeather : entry.weather;
  const currentMood = isEditing ? editMood : entry.mood;
  const weatherInfo = WEATHER_OPTIONS.find((w) => w.value === currentWeather);
  const moodInfo = MOOD_OPTIONS.find((m) => m.value === currentMood);

  const dateObj = new Date(entry.date);
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[dateObj.getDay()];

  const isValid = editTitle.trim().length > 0 && editContent.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
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
          <Text style={styles.headerLabel}>
            {isEditing ? "일기 수정" : "일기 상세"}
          </Text>
          {isEditing ? (
            <Pressable
              onPress={handleSave}
              disabled={!isValid}
              style={styles.editButton}
              hitSlop={12}
            >
              <Text
                style={[
                  styles.editButtonText,
                  !isValid && styles.editButtonTextDisabled,
                ]}
              >
                저장
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleEditStart}
              style={styles.editButton}
              hitSlop={12}
            >
              <Text style={styles.editButtonText}>수정</Text>
            </Pressable>
          )}
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {!isEditing && (
              <View style={styles.dateRow}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.dayOfWeek}>{dayOfWeek}요일</Text>
              </View>
            )}

            {isEditing ? (
              <>
                <View style={styles.sectionLabel}>
                  <Text style={styles.sectionLabelText}>날짜</Text>
                </View>
                <DatePickerField value={editDate} onChange={setEditDate} />

                <View style={styles.sectionLabel}>
                  <Text style={styles.sectionLabelText}>날씨</Text>
                </View>
                <View style={styles.optionRow}>
                  {WEATHER_OPTIONS.map((w) => (
                    <Pressable
                      key={w.value}
                      onPress={() => {
                        setEditWeather(w.value);
                        Haptics.selectionAsync();
                      }}
                      style={[
                        styles.optionChip,
                        editWeather === w.value && styles.optionChipSelected,
                      ]}
                    >
                      <Text style={styles.optionIcon}>{w.icon}</Text>
                      <Text
                        style={[
                          styles.optionChipText,
                          editWeather === w.value &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {w.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <View style={styles.sectionLabel}>
                  <Text style={styles.sectionLabelText}>기분</Text>
                </View>
                <View style={styles.optionRow}>
                  {MOOD_OPTIONS.map((m) => (
                    <Pressable
                      key={m.value}
                      onPress={() => {
                        setEditMood(m.value);
                        Haptics.selectionAsync();
                      }}
                      style={[
                        styles.optionChip,
                        editMood === m.value && styles.optionChipSelected,
                      ]}
                    >
                      <Text style={styles.optionIcon}>{m.icon}</Text>
                      <Text
                        style={[
                          styles.optionChipText,
                          editMood === m.value && styles.optionChipTextSelected,
                        ]}
                      >
                        {m.value}점
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            ) : (
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
            )}

            <View style={styles.divider} />

            {isEditing ? (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>제목</Text>
                <TextInput
                  style={styles.titleInput}
                  value={editTitle}
                  onChangeText={setEditTitle}
                  placeholder="제목을 입력하세요"
                  placeholderTextColor={COLORS.textMuted}
                  maxLength={60}
                  returnKeyType="next"
                />
                <Text style={styles.charCount}>{editTitle.length} / 60</Text>

                <Text style={[styles.inputLabel, { marginTop: SPACING.sm }]}>
                  본문
                </Text>
                <TextInput
                  style={styles.contentInput}
                  value={editContent}
                  onChangeText={setEditContent}
                  placeholder="내용을 입력하세요"
                  placeholderTextColor={COLORS.textMuted}
                  multiline
                  textAlignVertical="top"
                  maxLength={2000}
                />
                <Text style={styles.charCount}>
                  {editContent.length} / 2000
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.content}>{entry.content}</Text>
              </>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
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
  editButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
  editButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  sectionLabel: {
    marginBottom: -SPACING.xs,
  },
  sectionLabelText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  optionChipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  optionIcon: {
    fontSize: 16,
  },
  optionChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  optionChipTextSelected: {
    color: COLORS.primary,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  titleInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  contentInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    minHeight: 200,
    lineHeight: 24,
  },
  charCount: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: "right",
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
