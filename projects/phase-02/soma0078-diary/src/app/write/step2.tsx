import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { MoodLevel, WeatherType } from "@/types";
import ProgressBar from "@/components/ProgressBar";
import { saveDiary } from "@/data/storage";

export default function Step2Screen() {
  const params = useLocalSearchParams<{
    date: string;
    weather: string;
    mood: string;
  }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const isComplete = title.trim().length > 0 && content.trim().length > 0;

  const handleSave = useCallback(async () => {
    if (!isComplete) return;

    setIsSaving(true);
    try {
      const entry = {
        id: Date.now().toString(),
        date: params.date || new Date().toISOString().split("T")[0],
        weather: params.weather as WeatherType,
        mood: parseInt(params.mood || "3") as MoodLevel,
        title,
        content,
        createdAt: Date.now(),
      };

      await saveDiary(entry);

      router.push({
        pathname: "/write/success",
        params: { entryId: entry.id },
      });
    } catch (error) {
      console.error("Error saving diary:", error);
    } finally {
      setIsSaving(false);
    }
  }, [
    isComplete,
    params.date,
    params.weather,
    params.mood,
    title,
    content,
    router,
  ]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>일기 쓰기</Text>
        <View style={{ width: 28 }} />
      </View>

      <ProgressBar current={2} total={2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.section}>
            <Text style={styles.label}>제목</Text>
            <TextInput
              style={styles.input}
              placeholder="오늘을 한 줄로 표현한다면?"
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length} / 100</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>본문</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="오늘 어떤 하루를 보냈나요?"
              placeholderTextColor={COLORS.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              maxLength={1000}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{content.length} / 1000</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={[
              styles.saveButton,
              !isComplete && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!isComplete || isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "저장 중..." : "저장"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  contentInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 200,
  },
  charCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: "right",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});
