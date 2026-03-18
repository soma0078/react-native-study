import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const PROJECT_DETAILS: Record<
  string,
  { title: string; description: string; learnings: string[]; techs: string[] }
> = {
  "1": {
    title: "프로필 카드 앱",
    description:
      "React Native의 기본 컴포넌트(View, Text, Image)를 활용하여 프로필 카드 UI를 구현했습니다. StyleSheet를 사용해 스타일을 분리하고, Flexbox로 레이아웃을 구성하는 방법을 학습했습니다.",
    learnings: [
      "View, Text, Image 컴포넌트 사용법",
      "StyleSheet.create로 스타일 분리",
      "Flexbox 레이아웃 구성 (alignItems, justifyContent)",
      "Image source의 require와 uri 차이",
    ],
    techs: ["React Native", "StyleSheet", "Flexbox"],
  },
  "2": {
    title: "리스트 화면 구현",
    description:
      "ScrollView와 FlatList를 활용해 스크롤 가능한 리스트 UI를 구현했습니다. 두 컴포넌트의 렌더링 방식과 성능 차이를 직접 비교해보았습니다.",
    learnings: [
      "ScrollView: 모든 자식을 한 번에 렌더링",
      "FlatList: 화면에 보이는 항목만 렌더링 (가상화)",
      "대량 데이터에서는 FlatList가 메모리 효율적",
      "keyExtractor로 고유 키 지정",
    ],
    techs: ["ScrollView", "FlatList", "React Native"],
  },
  "3": {
    title: "탭 네비게이션",
    description:
      "expo-router의 Tabs를 사용해 Bottom Tab Navigation을 구현했습니다. 3개의 탭(Home, About, Profile)을 구성하고 아이콘을 적용했습니다.",
    learnings: [
      "expo-router의 파일 기반 라우팅",
      "(tabs) 그룹으로 탭 네비게이션 구성",
      "tabBarIcon으로 커스텀 아이콘 적용",
      "screenOptions로 탭바 스타일 통일",
    ],
    techs: ["expo-router", "Tabs", "FontAwesome"],
  },
  "4": {
    title: "스타일링 심화",
    description:
      "Flexbox 속성(flexDirection, justifyContent, alignItems)을 깊이 학습하고, Platform.select로 iOS/Android별 스타일을 분기 처리했습니다.",
    learnings: [
      "flexDirection으로 축 방향 제어",
      "justifyContent, alignItems로 정렬",
      "Platform.OS / Platform.select로 플랫폼별 분기",
      "iOS shadow vs Android elevation 차이",
    ],
    techs: ["Flexbox", "Platform", "StyleSheet"],
  },
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const project = PROJECT_DETAILS[id] ?? PROJECT_DETAILS["1"];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <FontAwesome name="arrow-left" size={16} color="#0f766e" />
        <Text style={styles.backText}>돌아가기</Text>
      </Pressable>

      <Text style={styles.title}>{project.title}</Text>

      <View style={styles.techRow}>
        {project.techs.map((tech) => (
          <View key={tech} style={styles.techBadge}>
            <Text style={styles.techText}>{tech}</Text>
          </View>
        ))}
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>{project.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>배운 점</Text>
      {project.learnings.map((item, index) => (
        <View key={index} style={styles.learningItem}>
          <View style={styles.bullet} />
          <Text style={styles.learningText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContent: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 24,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 15,
    color: "#0f766e",
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#030712",
    marginBottom: 16,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  techBadge: {
    backgroundColor: "#ecfdf5",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  techText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f766e",
  },
  descriptionCard: {
    padding: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 26,
    color: "#334155",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#030712",
    marginBottom: 16,
  },
  learningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0f766e",
    marginTop: 6,
    marginRight: 12,
  },
  learningText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
  },
});
