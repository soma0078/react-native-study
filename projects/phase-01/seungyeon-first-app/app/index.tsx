import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
  const openGithub = () => {
    Linking.openURL("https://github.com/juseungyeon");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image
          source={require("../assets/images/my-profile.jpeg")}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.nameText}>주승연</Text>
      <TouchableOpacity onPress={openGithub} style={styles.githubBadge}>
        <FontAwesome name="github" size={14} color="#fff" />
        <Text style={styles.githubText}>@juseungyeon</Text>
      </TouchableOpacity>

      <Text style={styles.jobText}>Frontend Developer / RN Beginner</Text>

      <View style={styles.bioBubble}>
        <Text style={styles.bioText}>
          {`안녕하세요! 👋 \n새로운 기술을 배우는 것을 즐기는 개발자입니다. \n현재 React Native를 통해 \n모바일 앱 개발의 세계에 입문했습니다. \n앞으로 멋진 UI와 기능을 가진 앱을 만들고 싶습니다!`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCard: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 10,
    shadowColor: "#C0ECAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
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
