import {
  Image,
  ImageBackground,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const INTERESTS = [
  { emoji: "📚", label: "독서" },
  { emoji: "🎮", label: "게임" },
  { emoji: "🌱", label: "식물" },
  { emoji: "🏊", label: "수영" },
  { emoji: "♨️", label: "온천" },
  { emoji: "🎣", label: "낚시" },
];

const SECTION_COLORS: Record<
  string,
  { bg: string; text: string; header: string }
> = {
  Frontend: { bg: "#F9EBBE", text: "#d77600ff", header: "#d77600ff" },
  Tools: { bg: "#F0FDF4", text: "#16A34A", header: "#16A34A" },
};

const SKILLS: { title: string; data: string[][] }[] = [
  {
    title: "Frontend",
    data: [["React", "JavaScript", "TypeScript", "Next.js", "React Native"]],
  },
  {
    title: "Tools",
    data: [["Git", "Figma"]],
  },
];

export default function ProfileScreen() {
  return (
    <SectionList
      sections={SKILLS}
      keyExtractor={(_, index) => String(index)}
      ListHeaderComponent={<ProfileHeader />}
      renderSectionHeader={({ section: { title } }) => {
        const color = SECTION_COLORS[title]?.header ?? "orange";
        return (
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionHeaderText, { color }]}>{title}</Text>
          </View>
        );
      }}
      renderItem={({ item, section }) => {
        const colors = SECTION_COLORS[section.title];
        return (
          <View style={styles.skillGrid}>
            {item.map((skill) => (
              <View
                key={skill}
                style={[
                  styles.skillCard,
                  { backgroundColor: colors?.bg ?? "#f9ebbeff" },
                ]}
              >
                <Text
                  style={[
                    styles.skillCardText,
                    { color: colors?.text ?? "#374151" },
                  ]}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        );
      }}
      contentContainerStyle={styles.listContent}
    />
  );
}

function ProfileHeader() {
  return (
    <View style={styles.profileContainer}>
      {/* 배경 이미지 */}
      <View style={styles.bgContainer}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/seed/cloudy/800/400" }}
          style={styles.bgImg}
          resizeMode="cover"
        />
      </View>

      {/* 프로필 이미지 */}
      <View style={styles.profileImgContainer}>
        <Image
          source={require("../assets/images/duck.jpeg")}
          style={styles.profileImg}
        />
      </View>

      {/* 프로필 정보 카드 */}
      <View style={styles.infoCard}>
        <Text style={styles.nickName}>@soma0078</Text>
        <Text style={styles.profileName}>이송아</Text>
        <Text style={styles.profileJob}>Frontend Engineer</Text>
      </View>

      {/* 관심사 */}
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.chipsContainer}>
        {INTERESTS.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.chip,
              pressed && styles.chipPressed,
            ]}
          >
            <Text style={styles.chipEmoji}>{item.emoji}</Text>
            <Text style={styles.chipLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 스킬 섹션 헤더 */}
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  profileContainer: {
    marginBottom: 8,
  },
  bgContainer: {
    width: "100%",
    height: 180,
    overflow: "hidden",
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
  profileImgContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  nickName: {
    fontSize: 14,
    color: "#b6b6b6ff",
  },
  profileName: {
    fontSize: 26,
    fontWeight: "semibold",
  },
  profileJob: {
    fontSize: 15,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: "#1a1a1a",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  chipPressed: {
    backgroundColor: "#f0f0f0",
    transform: [{ scale: 0.96 }],
  },
  chipEmoji: {
    fontSize: 20,
  },
  chipLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  skillGrid: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillCard: {
    width: "48.5%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  skillCardText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
