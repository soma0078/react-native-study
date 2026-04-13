import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
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
import { CompletionModal } from "@/components/CompletionModal";
import { ProgressBar } from "@/components/ProgressBar";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { useDiaries } from "@/hooks/useDiaries";
import type { DiaryEntry } from "@/types/diary";
import { useWriteForm } from "./_layout";

export default function Step2() {
  const { form, update, resetForm } = useWriteForm();
  const { save } = useDiaries();
  const [modalVisible, setModalVisible] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const isValid =
    form.title.trim().length > 0 && form.content.trim().length > 0;

  const saveScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!isValid) return;
    Animated.spring(saveScale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(saveScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleSave = async () => {
    if (!isValid || !form.weather || !form.mood) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: form.date,
      weather: form.weather,
      mood: form.mood,
      title: form.title.trim(),
      content: form.content.trim(),
      createdAt: Date.now(),
    };

    await save(entry);
    setSavedId(entry.id);
    setModalVisible(true);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleGoList = () => {
    setModalVisible(false);
    resetForm();
    router.replace("/");
  };

  const handleViewDiary = () => {
    setModalVisible(false);
    resetForm();
    if (savedId) {
      router.replace(`/detail/${savedId}`);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={2} total={2} />

      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>본문 작성</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>제목</Text>
              <TextInput
                style={styles.titleInput}
                value={form.title}
                onChangeText={(title) => update({ title })}
                placeholder="오늘 하루를 한 줄로 표현한다면?"
                placeholderTextColor={COLORS.textMuted}
                maxLength={60}
                returnKeyType="next"
              />
              <Text style={styles.charCount}>{form.title.length} / 60</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>본문</Text>
              <TextInput
                style={styles.contentInput}
                value={form.content}
                onChangeText={(content) => update({ content })}
                placeholder="오늘 있었던 일을 자유롭게 적어보세요."
                placeholderTextColor={COLORS.textMuted}
                multiline
                textAlignVertical="top"
                maxLength={2000}
              />
              <Text style={styles.charCount}>{form.content.length} / 2000</Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <Animated.View
            style={[
              styles.saveButtonWrapper,
              { transform: [{ scale: saveScale }] },
            ]}
          >
            <Pressable
              onPress={handleSave}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={!isValid}
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  !isValid && styles.saveButtonTextDisabled,
                ]}
              >
                저장하기
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      <CompletionModal
        visible={modalVisible}
        onGoList={handleGoList}
        onViewDiary={handleViewDiary}
      />
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
    gap: SPACING.lg,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  label: {
    fontSize: 15,
    padding: 4,
    fontWeight: "700",
    color: COLORS.text,
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
  footer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  saveButtonWrapper: {
    width: "100%",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
  saveButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});
