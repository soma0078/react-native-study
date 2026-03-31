import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Profile } from "../types";

type ProfileHeaderProps = {
  profile: Profile;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: profile.profileImage }} style={styles.avatar} />
        <View style={styles.stats}>
          <StatItem count={profile.postCount} label="게시물" />
          <StatItem count={profile.followerCount} label="팔로워" />
          <StatItem count={profile.followingCount} label="팔로잉" />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>프로필 편집</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>프로필 공유</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatItem({ count, label }: { count: number; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 28,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statCount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#262626",
  },
  statLabel: {
    fontSize: 12,
    color: "#262626",
    marginTop: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#262626",
    marginBottom: 4,
  },
  bio: {
    fontSize: 13,
    color: "#262626",
    lineHeight: 18,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  editButton: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#262626",
  },
  shareButton: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#262626",
  },
});
