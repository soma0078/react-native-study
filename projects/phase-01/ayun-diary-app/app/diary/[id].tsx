import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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

export default function DiaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [diary, setDiary] = useState<DiaryItem | null>(null);

  useEffect(() => {
    const loadDiary = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed: DiaryItem[] = stored ? JSON.parse(stored) : [];
        const foundDiary = parsed.find((item) => item.id === id) ?? null;
        setDiary(foundDiary);
      } catch (error) {
        console.error('일기 상세 불러오기 실패:', error);
      }
    };

    if (id) {
      loadDiary();
    }
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: '일기 상세',
          headerStyle: { backgroundColor: '#F6FBF1' },
          headerTitleStyle: { color: '#6A7B63', fontWeight: '700' },
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.safe} contentContainerStyle={styles.container}>
        {!diary ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>일기를 찾을 수 없어요</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.dateText}>{diary.date}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>
                  {weatherEmojiMap[diary.weather]} {diary.weather}
                </Text>
              </View>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>
                  {moodEmojiMap[diary.mood]} {diary.mood}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>{diary.title}</Text>
            <Text style={styles.content}>{diary.content}</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F8F0',
  },
  container: {
    padding: 16,
  },
  emptyCard: {
    backgroundColor: '#FBFDFC',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6C7C61',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FBFDFC',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },
  dateText: {
    fontSize: 14,
    color: '#8AA3B4',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoBadge: {
    backgroundColor: '#EAF3E3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  infoText: {
    color: '#627456',
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6C7C61',
    marginBottom: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#5F6B5A',
  },
});