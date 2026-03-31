import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../types";

const { width } = Dimensions.get("window");

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 더블탭 감지용
  const lastTapRef = useRef<number>(0);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    // 300ms 이내 두 번 탭 → 좋아요 토글
    if (now - lastTapRef.current < 300) {
      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
    lastTapRef.current = now; // 현재 탭 시간 업데이트
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.user.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{post.user.name}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* 피드 이미지 — Pressable로 더블탭 감지 */}
      <Pressable onPress={handleDoubleTap}>
        <Image source={{ uri: post.imageUrl }} style={styles.feedImage} />
      </Pressable>

      {/* 액션 버튼 */}
      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "#ed4956" : "#262626"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="chatbubble-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="paper-plane-outline" size={26} color="#262626" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsBookmarked((prev) => !prev)}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={26}
            color="#262626"
          />
        </TouchableOpacity>
      </View>

      {/* 좋아요 수 */}
      <Text style={styles.likes}>좋아요 {likes}개</Text>

      {/* 캡션 */}
      <Text style={styles.caption}>
        <Text style={styles.captionUsername}>{post.user.name} </Text>
        {post.caption}
      </Text>

      {/* 댓글 수 */}
      {post.commentCount > 0 && (
        <Text style={styles.commentCount}>
          댓글 {post.commentCount}개 모두 보기
        </Text>
      )}

      {/* 날짜 */}
      <Text style={styles.date}>{post.createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    flex: 1,
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
  },
  feedImage: {
    width: width,
    height: width,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginLeft: 14,
  },
  likes: {
    paddingHorizontal: 12,
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
    marginBottom: 4,
  },
  caption: {
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#262626",
    marginBottom: 4,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: "600",
  },
  commentCount: {
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#8e8e8e",
    marginBottom: 4,
  },
  date: {
    paddingHorizontal: 12,
    fontSize: 11,
    color: "#8e8e8e",
    marginBottom: 10,
  },
});
