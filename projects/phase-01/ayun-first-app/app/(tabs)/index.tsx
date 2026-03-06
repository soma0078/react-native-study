import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/profile.png")}
        style={styles.avatar}
      />

      <Text style={styles.name}>정아윤</Text>
      <Text style={styles.role}>UX/UI Designer</Text>

      <Text style={styles.bio}>
        안녕하세요.
        UX/UI 디자이너 정아윤입니다.
        {"\n"}
        React Native + Expo로 첫 모바일 앱을 만들고 있습니다. 너무 어려워요.˜
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFEAF2",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#FFD2E4",
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#D96C9D",
    marginBottom: 8,
  },

  role: {
    fontSize: 16,
    color: "#A55C7A",
    marginBottom: 20,
  },

  bio: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    color: "#6B4B57",
    paddingHorizontal: 20,
  },

});