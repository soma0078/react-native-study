import { FlatList, Image, StyleSheet, Pressable, View, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post, REELS } from "../data/dummy";

type Props = {
  tab: "posts" | "reels" | "tagged";
  data: Post[];
};

export default function PostGrid({ tab, data }: Props) {
  const { width } = useWindowDimensions();
  const itemSize = (width - 2) / 3;

  if (tab === "reels") {
    return <ReelsGrid itemSize={itemSize} />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <Pressable style={({ pressed }) => [{ width: itemSize, height: itemSize }, pressed && { opacity: 0.8 }]}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {tab === "tagged" && (
            <View style={styles.tagBadge}>
              <Ionicons name="pricetag" size={10} color="#fff" />
            </View>
          )}
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      columnWrapperStyle={{ gap: 1 }}
    />
  );
}

function ReelsGrid({ itemSize }: { itemSize: number }) {
  return (
    <FlatList
      data={REELS}
      keyExtractor={(item) => item.id}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <Pressable style={({ pressed }) => [{ width: itemSize, height: itemSize * 1.5 }, pressed && { opacity: 0.8 }]}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.reelOverlay}>
            <Ionicons name="play" size={16} color="#fff" />
            <Text style={styles.reelViews}>{item.views}</Text>
          </View>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      columnWrapperStyle={{ gap: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  tagBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
  },
  reelOverlay: {
    position: "absolute",
    bottom: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reelViews: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
