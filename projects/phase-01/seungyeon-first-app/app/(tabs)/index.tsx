import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const PROJECTS = [
  {
    id: 1,
    title: "프로필 카드 앱",
    description: "React Native로 만든 첫 번째 프로필 카드 UI",
    status: "완료",
  },
  {
    id: 2,
    title: "리스트 화면 구현",
    description: "ScrollView를 활용한 리스트 레이아웃 연습",
    status: "완료",
  },
  {
    id: 3,
    title: "탭 네비게이션",
    description: "Bottom Tab Navigator로 화면 전환 구현",
    status: "진행 중",
  },
  {
    id: 4,
    title: "스타일링 심화",
    description: "Flexbox와 StyleSheet를 활용한 레이아웃 구성",
    status: "예정",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/my-profile.jpeg")}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.greeting}>안녕하세요 👋</Text>
          <Text style={styles.name}>주승연</Text>
          <Text style={styles.tagline}>Frontend Developer</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Week 3-4 학습 내용</Text>
        {PROJECTS.map((project) => (
          <View key={project.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{project.title}</Text>
              <View
                style={[
                  styles.statusBadge,
                  project.status === "완료" && styles.statusDone,
                  project.status === "진행 중" && styles.statusInProgress,
                  project.status === "예정" && styles.statusPlanned,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    project.status === "완료" && styles.statusTextDone,
                    project.status === "진행 중" && styles.statusTextInProgress,
                    project.status === "예정" && styles.statusTextPlanned,
                  ]}
                >
                  {project.status}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{project.description}</Text>
          </View>
        ))}
      </View>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    padding: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#030712",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#030712",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusDone: {
    backgroundColor: "#dcfce7",
  },
  statusInProgress: {
    backgroundColor: "#dbeafe",
  },
  statusPlanned: {
    backgroundColor: "#f1f5f9",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextDone: {
    color: "#16a34a",
  },
  statusTextInProgress: {
    color: "#2563eb",
  },
  statusTextPlanned: {
    color: "#64748b",
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
});
