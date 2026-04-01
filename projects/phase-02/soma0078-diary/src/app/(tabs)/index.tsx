import { memo, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, WEATHER, MOOD_EMOJIS } from "@/constants/theme";
import { DiaryEntry, WeatherType, MoodLevel } from "@/types";
import { getDiaries, deleteDiary } from "@/data/storage";
import SwipeableItem from "@/components/SwipeableItem";
import { SafeAreaView } from "react-native-safe-area-context";

interface DiaryItemProps {
  id: string;
  date: string;
  title: string;
  content: string;
  weather: WeatherType;
  mood: MoodLevel;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

const DiaryItem = memo(function DiaryItem({
  id,
  date,
  title,
  content,
  weather,
  mood,
  onPress,
  onDelete,
}: DiaryItemProps) {
  const handlePress = useCallback(() => onPress(id), [id, onPress]);
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <SwipeableItem onDelete={handleDelete}>
      <Pressable style={styles.item} onPress={handlePress}>
        <View style={styles.itemContent}>
          <Text style={styles.itemDate}>{date}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemPreview} numberOfLines={2}>
            {content}
          </Text>
        </View>
        <View style={styles.itemMeta}>
          <Text style={styles.emoji}>{WEATHER[weather]}</Text>
          <Text style={styles.emoji}>{MOOD_EMOJIS[mood]}</Text>
        </View>
      </Pressable>
    </SwipeableItem>
  );
});

export default function DiaryListScreen() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadDiaries();
    }, []),
  );

  const loadDiaries = useCallback(async () => {
    const data = await getDiaries();
    setDiaries(data.sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const handleWrite = useCallback(() => {
    router.push("/write/step1");
  }, [router]);

  const handleItemPress = useCallback(
    (id: string) => {
      router.push(`/diary/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteDiary(id);
      loadDiaries();
    },
    [loadDiaries],
  );

  const renderItem = useCallback(
    ({ item }: { item: DiaryEntry }) => (
      <DiaryItem
        id={item.id}
        date={item.date}
        title={item.title}
        content={item.content}
        weather={item.weather}
        mood={item.mood}
        onPress={handleItemPress}
        onDelete={handleDelete}
      />
    ),
    [handleItemPress, handleDelete],
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../../../assets/empty.png")}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>아직 쓴 일기가 없어요</Text>
      <Text style={styles.emptyDesc}>오늘 하루를 기록해보는 건 어때요?</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>일기장</Text>
        <Pressable style={styles.writeButton} onPress={handleWrite}>
          <Ionicons name="add" size={24} color={COLORS.background} />
        </Pressable>
      </View>

      {diaries.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={diaries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
  },
  writeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emptyIcon: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  listContent: {
    padding: 12,
  },
  item: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  itemPreview: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  itemMeta: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 24,
  },
});
