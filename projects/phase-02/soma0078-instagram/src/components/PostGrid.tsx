import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Share,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { GridPost } from "../types";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = width / 3;
const GAP = StyleSheet.hairlineWidth; // 기기 픽셀 밀도에 맞는 얇은 선
const PREVIEW_SIZE = width * 0.85;

type PostGridProps = {
  posts: GridPost[];
  onPress: (id: string) => void;
};

type Action = {
  icon: string;
  label: string;
  onPress: (post: GridPost) => void;
};

const ACTIONS: Action[] = [
  {
    icon: "paper-plane-outline",
    label: "공유하기",
    onPress: (post) =>
      Share.share({ message: `https://instagram.com/p/${post.id}` }),
  },
  {
    icon: "link-outline",
    label: "링크 복사",
    onPress: (post) =>
      Clipboard.setStringAsync(`https://instagram.com/p/${post.id}`),
  },
  {
    icon: "bookmark-outline",
    label: "보관하기",
    onPress: () => {},
  },
];

export default function PostGrid({ posts, onPress }: PostGridProps) {
  const [previewPost, setPreviewPost] = useState<GridPost | null>(null);

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onPress(item.id)}
            onLongPress={() => setPreviewPost(item)}
            delayLongPress={300}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={previewPost !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        {/* 배경 블러 — 탭하면 닫힘 */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={() => setPreviewPost(null)}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            intensity={10}
            tint="dark"
          />
        </TouchableOpacity>

        {/* 프리뷰 + 액션 */}
        <View style={styles.previewContainer} pointerEvents="box-none">
          {/* 확대 이미지 */}
          <Image
            source={{ uri: previewPost?.imageUrl }}
            style={styles.previewImage}
          />

          {/* 액션 버튼 */}
          <View style={styles.actions}>
            {ACTIONS.map(({ icon, label, onPress: onAction }) => (
              <TouchableOpacity
                key={label}
                style={styles.actionItem}
                onPress={() => {
                  if (previewPost) onAction(previewPost);
                  setPreviewPost(null);
                }}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name={icon as any} size={22} color="#262626" />
                </View>
                <Text style={styles.actionLabel}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    padding: GAP,
  },
  image: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  previewImage: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: 12,
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    width: PREVIEW_SIZE,
  },
  actionItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    gap: 6,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 12,
    color: "#262626",
  },
});
