import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, WEATHER, MOOD_EMOJIS } from "@/constants/theme";
import { WeatherType, MoodLevel } from "@/types";
import ProgressBar from "@/components/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";

const today = new Date();

const formatLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const defaultDate = formatLocalDate(today);

export default function Step1Screen() {
  const [date, setDate] = useState(defaultDate);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showPicker, setShowPicker] = useState(false);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const router = useRouter();

  const handleDateChange = (_event: any, picked?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false); // Android: 확인/취소 모두 닫힘
    }
    if (picked) {
      setSelectedDate(picked);
      setDate(formatLocalDate(picked));
    }
  };

  const handleIOSConfirm = () => {
    setShowPicker(false);
  };

  const isComplete = weather !== null && mood !== null;

  const handleNext = () => {
    if (!isComplete) return;
    router.push({
      pathname: "/write/step2",
      params: {
        date,
        weather,
        mood: mood.toString(),
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>오늘을 기록해요</Text>
        <View style={{ width: 28 }} />
      </View>

      <ProgressBar current={1} total={2} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>날짜</Text>
          <Pressable
            style={styles.dateDisplay}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.dateText}>{date}</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={COLORS.textSecondary}
              style={styles.dateChevron}
            />
          </Pressable>

          {/* Android: 네이티브 다이얼로그 */}
          {Platform.OS === "android" && showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              maximumDate={today}
              onValueChange={handleDateChange}
            />
          )}

          {/* iOS: Modal + inline 달력 */}
          {Platform.OS === "ios" && (
            <Modal
              visible={showPicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowPicker(false)}
            >
              <Pressable
                style={styles.modalBackdrop}
                onPress={() => setShowPicker(false)}
              >
                <Pressable style={styles.modalContent}>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="inline"
                    maximumDate={today}
                    onValueChange={handleDateChange}
                    accentColor={COLORS.primary}
                  />
                  <Pressable
                    style={styles.confirmButton}
                    onPress={handleIOSConfirm}
                  >
                    <Text style={styles.confirmButtonText}>확인</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>날씨</Text>
          <View style={styles.buttonGroup}>
            {(Object.entries(WEATHER) as Array<[WeatherType, string]>).map(
              ([type, emoji]) => (
                <Pressable
                  key={type}
                  style={[
                    styles.weatherButton,
                    weather === type && styles.weatherButtonActive,
                  ]}
                  onPress={() => setWeather(type)}
                >
                  <Text style={styles.weatherEmoji}>{emoji}</Text>
                </Pressable>
              ),
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 기분</Text>
          <View style={styles.moodContainer}>
            {(Object.entries(MOOD_EMOJIS) as Array<[string, string]>).map(
              ([level, emoji]) => {
                const moodLevel = parseInt(level) as MoodLevel;
                return (
                  <Pressable
                    key={level}
                    style={[
                      styles.moodButton,
                      mood === moodLevel && styles.moodButtonActive,
                    ]}
                    onPress={() => setMood(moodLevel)}
                  >
                    <Text style={styles.moodEmoji}>{emoji}</Text>
                    <Text style={styles.moodLabel}>{level}</Text>
                  </Pressable>
                );
              },
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, !isComplete && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isComplete}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </Pressable>
      </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  dateChevron: {
    marginLeft: "auto",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherButton: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  weatherButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "20",
  },
  weatherEmoji: {
    fontSize: 40,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodButton: {
    width: "18%",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  moodButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "20",
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  confirmButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
