import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type WeatherType = '맑음' | '흐림' | '비' | '천둥';
type MoodType = '행복' | '보통' | '슬픔' | '화남';

type DiaryItem = {
  id: string;
  date: string;
  weather: WeatherType;
  mood: MoodType;
  title: string;
  content: string;
  createdAt: number;
};

const STORAGE_KEY = 'AYUN_DIARY_ITEMS_FINAL';

const weatherEmojiMap: Record<WeatherType, string> = {
  맑음: '☀️',
  흐림: '☁️',
  비: '🌧️',
  천둥: '⛈️',
};

const moodEmojiMap: Record<MoodType, string> = {
  행복: '😊',
  보통: '😌',
  슬픔: '🥲',
  화남: '😠',
};

export default function DiaryListScreen() {
  const router = useRouter();
  const [diaries, setDiaries] = useState<DiaryItem[]>([]);

  const loadDiaries = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: DiaryItem[] = stored ? JSON.parse(stored) : [];
      setDiaries(parsed);
    } catch (error) {
      console.error('일기 목록 불러오기 실패:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDiaries();
    }, [])
  );

  const handleDelete = async (id: string) => {
    try {
      const nextList = diaries.filter((item) => item.id !== id);
      setDiaries(nextList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    } catch (error) {
      console.error('일기 삭제 실패:', error);
    }
  };

  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>🌿 그림일기 목록</Text>
        <Text style={styles.subtitle}>오늘 있었던 이모저모를 모아보세요</Text>

        <Pressable
          onPress={() => router.push('/about')}
          style={styles.writeButton}
        >
          <Text style={styles.writeButtonText}>일기 쓰기 ✍️</Text>
        </Pressable>

        <FlatList
          data={diaries}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            diaries.length === 0 ? styles.emptyListContent : styles.listContent
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>🧸</Text>
              <Text style={styles.emptyTitle}>아직 일기가 없어요</Text>
              <Text style={styles.emptyText}>
                위의 버튼을 눌러 첫 번째 그림일기를 써보세요!
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/diary/${item.id}`)}
              style={styles.card}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.dateText}>{item.date}</Text>

                <Pressable onPress={() => handleDelete(item.id)} hitSlop={8}>
                  <Text style={styles.deleteText}>삭제</Text>
                </Pressable>
              </View>

              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {weatherEmojiMap[item.weather]} {item.weather}
                  </Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {moodEmojiMap[item.mood]} {item.mood}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardContent} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.detailHint}>눌러서 전체 보기</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F8F0',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6C7C61',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#8EA7BE',
    marginBottom: 16,
  },
  writeButton: {
    backgroundColor: '#F3B3C4',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  writeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyCard: {
    backgroundColor: '#FBFDFC',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6F7F67',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#99A89A',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FBFDFC',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: '#8AA3B4',
    marginBottom: 10,
  },
  deleteText: {
    fontSize: 13,
    color: '#F29AB2',
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#EAF3E3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#627456',
    fontWeight: '700',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6F7F67',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64705F',
  },
  detailHint: {
    marginTop: 10,
    fontSize: 12,
    color: '#97A692',
  },
});