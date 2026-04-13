import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DiaryCard } from "@/components/DiaryCard";
import { EmptyState } from "@/components/EmptyState";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { useDiaries } from "@/hooks/useDiaries";
import type { DiaryEntry } from "@/types/diary";

export default function Index() {
  const { diaries, loading, remove, refresh } = useDiaries();
  const fabScale = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleFabPressIn = () => {
    Animated.spring(fabScale, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handleFabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/write/step1");
  };

  const handleCardPress = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const handleDelete = (id: string) => {
    remove(id);
  };

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryCard
      entry={item}
      onPress={() => handleCardPress(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>내 일기</Text>
        <Text style={styles.count}>
          {diaries.length > 0 ? `${diaries.length}개` : ""}
        </Text>
      </View>

      {!loading && diaries.length === 0 ? (
        <EmptyState onWrite={handleFabPress} />
      ) : (
        <FlatList
          data={diaries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {diaries.length > 0 && (
        <Animated.View
          style={[styles.fab, { transform: [{ scale: fabScale }] }]}
        >
          <Pressable
            onPress={handleFabPress}
            onPressIn={handleFabPressIn}
            onPressOut={handleFabPressOut}
            style={styles.fabInner}
          >
            <Text style={styles.fabIcon}>✏️</Text>
          </Pressable>
        </Animated.View>
      )}
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
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  count: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    right: SPACING.lg,
    bottom: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  fabInner: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    fontSize: 24,
  },
});
