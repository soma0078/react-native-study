import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, WEATHER, MOOD_EMOJIS } from "@/constants/theme";
import { DiaryEntry } from "@/types";
import { getDiaryById, deleteDiary } from "@/data/storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiaryDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const [diary, setDiary] = useState<DiaryEntry | null>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDiary();
  }, [params.id]);

  const loadDiary = async () => {
    if (!params.id) return;
    const data = await getDiaryById(params.id);
    setDiary(data);
    setIsLoading(false);
  };

  const handleDelete = () => {
    if (!diary) return;

    Alert.alert("일기 삭제", "삭제한 일기는 복구할 수 없어요.", [
      { text: "취소", onPress: () => {} },
      {
        text: "삭제",
        onPress: async () => {
          await deleteDiary(diary.id);
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>일기</Text>
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color={COLORS.secondary} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {diary && (
          <>
            <View style={styles.metaSection}>
              <Text style={styles.date}>{diary.date}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaEmoji}>{WEATHER[diary.weather]}</Text>
                  <Text style={styles.metaLabel}>날씨</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaEmoji}>
                    {MOOD_EMOJIS[diary.mood]}
                  </Text>
                  <Text style={styles.metaLabel}>기분</Text>
                </View>
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.title}>{diary.title}</Text>
            </View>

            <View style={styles.contentSection}>
              <Text style={styles.contentText}>{diary.content}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loader: {
    flex: 1,
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  metaSection: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 20,
  },
  metaItem: {
    alignItems: "center",
  },
  metaEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  titleSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  contentSection: {
    marginBottom: 24,
  },
  contentText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 28,
  },
});
