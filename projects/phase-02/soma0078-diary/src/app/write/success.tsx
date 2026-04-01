import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/theme";

export default function SuccessScreen() {
  const params = useLocalSearchParams<{ entryId: string }>();
  const router = useRouter();

  const handleGoToList = () => {
    router.push("/(tabs)");
  };

  const handleViewDiary = () => {
    router.push(`/diary/${params.entryId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/completed.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>오늘 하루, 잘 담았어요</Text>
        <Text style={styles.message}>소중한 순간이 일기장에 남았어요.</Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.secondaryButton} onPress={handleGoToList}>
          <Text style={styles.secondaryButtonText}>일기 목록으로</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={handleViewDiary}>
          <Text style={styles.primaryButtonText}>방금 쓴 일기 보기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  icon: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});
