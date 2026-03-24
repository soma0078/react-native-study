import { View, Text, ScrollView, StyleSheet } from "react-native";

const SKILLS = [
  "HTML/CSS",
  "JavaScript",
  "TypeScript",
  "ReactJS",
  "NextJS",
  "React Native",
  "Recoil",
  "Zustand",
  "React-Query",
  "Tailwind",
  "Emotion",
  "Styled-Component",
  "Git",
  "GitLab",
  "Jenkins",
  "Storybook",
  "Figma",
  "Zeppelin",
  "Notion",
  "RESTful API",
];

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>소개</Text>
        <Text style={styles.bodyText}>
          React Native를 통해 모바일 앱 개발을 배우고 있습니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>스킬</Text>
        <View style={styles.skillList}>
          {SKILLS.map((skill) => (
            <View key={skill} style={styles.skillItem}>
              <Text style={styles.skillItemText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>목표</Text>
        <Text style={styles.bodyText}>
          멋진 UI와 사용자 경험을 갖춘 앱을 직접 설계하고 구현하는 것이
          목표입니다.
        </Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#030712",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#475569",
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillItem: {
    width: "48%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },
  skillItemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
});
