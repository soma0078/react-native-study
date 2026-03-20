import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  const openGithub = () => {
    Linking.openURL("https://github.com/juseungyeon");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageCard}>
        <Image
          source={require("../../assets/images/my-profile.jpeg")}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.nameText}>주승연</Text>
      <Pressable
        onPress={openGithub}
        style={({ pressed }) => [
          styles.githubBadge,
          pressed && { opacity: 0.7 },
        ]}
      >
        <FontAwesome name="github" size={14} color="#fff" />
        <Text style={styles.githubText}>@juseungyeon</Text>
      </Pressable>

      <Text style={styles.jobText}>Frontend Developer / RN Beginner</Text>

      <View style={styles.bioBubble}>
        <Text style={styles.bioText}>
          {`안녕하세요! 👋 \n현재 React Native를 통해 \n모바일 앱 개발의 세계에 입문했습니다. \n앞으로 멋진 UI와 기능을 가진 앱을 \n만들고 싶습니다!`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  imageCard: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#C0ECAA",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#030712",
    marginBottom: 10,
  },
  githubBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#030712",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  githubText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  jobText: {
    fontSize: 16,
    color: "#4d5565",
    fontWeight: "600",
    marginBottom: 25,
  },
  bioBubble: {
    padding: 24,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#30343e",
    fontWeight: "500",
  },
});
