import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      {/* 아바타 + 통계 */}
      <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://picsum.photos/seed/profile/200/200" }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.stats}>
          <StatItem label="게시물" value="293" />
          <StatItem label="팔로워" value="4.2만" />
          <StatItem label="팔로우" value="3" />
        </View>
      </View>

      {/* 이름 + 소개 */}
      <View style={styles.bio}>
        <Text style={styles.username}>insta</Text>
        <Text style={styles.bioText}>인스타그램</Text>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.actions}>
        <Pressable style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}>
          <Text style={styles.btnText}>팔로잉 ∨</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}>
          <Text style={styles.btnText}>메시지 보내기</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}>
          <Ionicons name="person-add-outline" size={16} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#c13584",
    padding: 2,
    marginRight: 24,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  statLabel: {
    color: "#fff",
    fontSize: 13,
  },
  bio: {
    marginBottom: 12,
    gap: 2,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  bioText: {
    color: "#fff",
    fontSize: 13,
  },
  italic: {
    fontStyle: "italic",
  },
  dash: {
    color: "#fff",
    fontSize: 13,
    marginTop: 2,
  },
  link: {
    color: "#4ea8f7",
    fontSize: 13,
  },
  threadsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  threadsText: {
    color: "#aaa",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: "#262626",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  iconBtn: {
    backgroundColor: "#262626",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});
