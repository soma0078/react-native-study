import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
const TITLE_MAX_LENGTH = 20;
const CONTENT_MAX_LENGTH = 300;

const WEATHER_OPTIONS: { label: WeatherType; emoji: string }[] = [
  { label: '맑음', emoji: '☀️' },
  { label: '흐림', emoji: '☁️' },
  { label: '비', emoji: '🌧️' },
  { label: '천둥', emoji: '⛈️' },
];

const MOOD_OPTIONS: { label: MoodType; emoji: string }[] = [
  { label: '행복', emoji: '😊' },
  { label: '보통', emoji: '😌' },
  { label: '슬픔', emoji: '🥲' },
  { label: '화남', emoji: '😠' },
];

const formatKoreanDate = (date: Date) => date.toLocaleDateString('ko-KR');

export default function DiaryWriteScreen() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [mood, setMood] = useState<MoodType | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [savedDiary, setSavedDiary] = useState<DiaryItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dateText = formatKoreanDate(selectedDate);

  const isStepOneValid = useMemo(() => {
    return Boolean(weather && mood);
  }, [weather, mood]);

  const isStepTwoValid = useMemo(() => {
    return Boolean(title.trim() && content.trim());
  }, [title, content]);

  const progressWidth = step === 1 ? '50%' : '100%';

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') return;
    if (date) setSelectedDate(date);
  };

  const handleNextStep = () => {
    if (!isStepOneValid) return;
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSave = async () => {
    if (!weather || !mood) {
      Alert.alert('잠깐!', '날씨와 기분을 선택해주세요.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      Alert.alert('잠깐!', '제목과 본문을 모두 입력해주세요.');
      return;
    }

    const newDiary: DiaryItem = {
      id: Date.now().toString(),
      date: dateText,
      weather,
      mood,
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    };

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const previousList: DiaryItem[] = stored ? JSON.parse(stored) : [];
      const nextList = [newDiary, ...previousList];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));

      setSavedDiary(newDiary);
      setIsModalVisible(true);
      Keyboard.dismiss();
    } catch (error) {
      console.error('일기 저장 실패:', error);
      Alert.alert('오류', '일기 저장 중 문제가 생겼어요.');
    }
  };

  const handleGoList = () => {
    setIsModalVisible(false);
    router.replace('/');
  };

  const handleSeeSavedDiary = () => {
    if (!savedDiary) return;
    setIsModalVisible(false);
    router.push(`/diary/${savedDiary.id}`);
  };

  const handleKeepWriting = () => {
    setStep(1);
    setSelectedDate(new Date());
    setShowDatePicker(false);
    setWeather(null);
    setMood(null);
    setTitle('');
    setContent('');
    setSavedDiary(null);
    setIsModalVisible(false);
  };

  return (
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.topTitle}>🌿 오늘의 그림일기 🌸</Text>
          <Text style={styles.topSubtitle}>오늘은 무슨 일이 있었어요?</Text>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>현재 단계</Text>
              <Text style={styles.progressValue}>{step} / 3</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
          </View>

          {step === 1 ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Step 1. 기본 정보</Text>

              <Text style={styles.label}>날짜</Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={styles.dateBox}
              >
                <Text style={styles.dateText}>{dateText}</Text>
                <Text style={styles.dateSubText}>눌러서 날짜를 선택해요</Text>
              </Pressable>

              {showDatePicker ? (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={handleDateChange}
                />
              ) : null}

              <Text style={styles.label}>날씨</Text>
              <View style={styles.optionGrid}>
                {WEATHER_OPTIONS.map((item) => {
                  const isSelected = weather === item.label;
                  return (
                    <Pressable
                      key={item.label}
                      onPress={() => setWeather(item.label)}
                      style={[
                        styles.optionButton,
                        isSelected
                          ? styles.optionButtonSelectedGreen
                          : styles.optionButtonUnselected,
                      ]}
                    >
                      <Text style={styles.optionEmoji}>{item.emoji}</Text>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected
                            ? styles.optionTextSelected
                            : styles.optionTextUnselected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.label}>기분</Text>
              <View style={styles.optionGrid}>
                {MOOD_OPTIONS.map((item) => {
                  const isSelected = mood === item.label;
                  return (
                    <Pressable
                      key={item.label}
                      onPress={() => setMood(item.label)}
                      style={[
                        styles.optionButton,
                        isSelected
                          ? styles.optionButtonSelectedBlue
                          : styles.optionButtonUnselected,
                      ]}
                    >
                      <Text style={styles.optionEmoji}>{item.emoji}</Text>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected
                            ? styles.optionTextSelected
                            : styles.optionTextUnselected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable
                disabled={!isStepOneValid}
                onPress={handleNextStep}
                style={[
                  styles.mainButton,
                  !isStepOneValid && styles.mainButtonDisabled,
                ]}
              >
                <Text style={styles.mainButtonText}>다음</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Step 2. 본문 작성</Text>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>
                  {dateText} · {weather} · {mood}
                </Text>
              </View>

              <Text style={styles.label}>제목</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="예: 오늘 공원에서 있었던 일"
                placeholderTextColor="#A4AAA2"
                style={styles.input}
                maxLength={TITLE_MAX_LENGTH}
                returnKeyType="done"
              />
              <Text style={styles.countText}>
                {title.length}/{TITLE_MAX_LENGTH}
              </Text>

              <Text style={styles.label}>본문</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="오늘은 어떤 행복 한 입, 슬픔 한 조각이 있었는지 적어주세요. 뭐든 좋아요!"
                placeholderTextColor="#A4AAA2"
                style={styles.textArea}
                multiline
                textAlignVertical="top"
                maxLength={CONTENT_MAX_LENGTH}
              />
              <Text style={styles.countText}>
                {content.length}/{CONTENT_MAX_LENGTH}
              </Text>

              <View style={styles.buttonRow}>
                <Pressable onPress={handlePrevStep} style={styles.subButton}>
                  <Text style={styles.subButtonText}>이전</Text>
                </Pressable>

                <Pressable
                  disabled={!isStepTwoValid}
                  onPress={handleSave}
                  style={[
                    styles.mainButton,
                    styles.flexButton,
                    !isStepTwoValid && styles.mainButtonDisabled,
                  ]}
                >
                  <Text style={styles.mainButtonText}>저장하기 💖</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>

        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalEmoji}>✨</Text>
              <Text style={styles.modalTitle}>일기가 저장되었습니다!</Text>

              <Pressable onPress={handleGoList} style={styles.modalMainButton}>
                <Text style={styles.modalMainButtonText}>목록으로 가기</Text>
              </Pressable>

              <Pressable onPress={handleSeeSavedDiary} style={styles.modalSubButton}>
                <Text style={styles.modalSubButtonText}>작성한 일기 보기</Text>
              </Pressable>

              <Pressable onPress={handleKeepWriting} style={styles.modalGhostButton}>
                <Text style={styles.modalGhostButtonText}>새 일기 계속 쓰기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F8F0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  topTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6C7C61',
    marginBottom: 6,
  },
  topSubtitle: {
    fontSize: 16,
    color: '#8EA7BE',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#FBFDFC',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2EBDD',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    color: '#7A8B72',
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 14,
    color: '#F19BB2',
    fontWeight: '700',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E8EFE4',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#F3B3C4',
  },
  card: {
    backgroundColor: '#FBFDFC',
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6C7C61',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6C7C61',
    marginBottom: 8,
  },
  dateBox: {
    backgroundColor: '#EEF6E7',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDEBD2',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#627456',
    marginBottom: 4,
  },
  dateSubText: {
    fontSize: 13,
    color: '#8D9C86',
  },
  optionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    width: 74,
    height: 82,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  optionButtonUnselected: {
    backgroundColor: '#F0F1EF',
    borderColor: '#E0E2DE',
  },
  optionButtonSelectedGreen: {
    backgroundColor: '#DDEFD2',
    borderColor: '#9FC48A',
  },
  optionButtonSelectedBlue: {
    backgroundColor: '#E4F0F8',
    borderColor: '#A8C6DA',
  },
  optionEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: '#627456',
  },
  optionTextUnselected: {
    color: '#8E938D',
  },
  summaryBox: {
    backgroundColor: '#EEF6E7',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  summaryText: {
    color: '#627456',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#F1F5EC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#5D6A58',
  },
  textArea: {
    minHeight: 170,
    backgroundColor: '#F1F5EC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#5D6A58',
  },
  countText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#96A08F',
    marginTop: 6,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  flexButton: {
    flex: 1,
  },
  mainButton: {
    backgroundColor: '#F3B3C4',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  mainButtonDisabled: {
    backgroundColor: '#D9E1D4',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  subButton: {
    minWidth: 92,
    backgroundColor: '#E9F2E3',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  subButtonText: {
    color: '#6C7C61',
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(64, 70, 60, 0.25)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5EDE0',
  },
  modalEmoji: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6C7C61',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalMainButton: {
    backgroundColor: '#F3B3C4',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalMainButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  modalSubButton: {
    backgroundColor: '#E7F1E1',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalSubButtonText: {
    color: '#66775E',
    fontWeight: '700',
    fontSize: 15,
  },
  modalGhostButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalGhostButtonText: {
    color: '#93A08C',
    fontWeight: '700',
    fontSize: 14,
  },
});