import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const PROJECTS = [
  {
    id: "1",
    title: "프로필 카드 앱",
    description: "React Native로 만든 첫 번째 프로필 카드 UI",
    status: "완료",
  },
  {
    id: "2",
    title: "리스트 화면 구현",
    description: "ScrollView를 활용한 리스트 레이아웃 연습",
    status: "완료",
  },
  {
    id: "3",
    title: "탭 네비게이션",
    description: "Bottom Tab Navigator로 화면 전환 구현",
    status: "완료",
  },
  {
    id: "4",
    title: "스타일링 심화",
    description: "Flexbox와 StyleSheet를 활용한 레이아웃 구성",
    status: "완료",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={PROJECTS}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
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
      }
      ListHeaderComponentStyle={styles.headerWrapper}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/detail/[id]",
              params: { id: item.id },
            })
          }
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={[styles.statusBadge, styles.statusDone]}>
              <Text style={[styles.statusText, styles.statusTextDone]}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardArrow}>자세히 보기 →</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  listContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerWrapper: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
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
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextDone: {
    color: "#16a34a",
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 8,
  },
  cardArrow: {
    fontSize: 13,
    color: "#0f766e",
    fontWeight: "600",
  },
});
