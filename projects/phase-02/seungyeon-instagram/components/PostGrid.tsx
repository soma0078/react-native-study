import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post, REELS } from "../data/dummy";

type Props = {
  tab: "posts" | "reels" | "tagged";
  data: Post[];
};

function DoubleTapImage({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  const lastTap = useRef<number>(0);
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      heartScale.setValue(0);
      heartOpacity.setValue(0);
      Animated.sequence([
        Animated.parallel([
          Animated.spring(heartScale, {
            toValue: 1,
            useNativeDriver: true,
            damping: 10,
            stiffness: 300,
          }),
          Animated.timing(heartOpacity, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
    lastTap.current = now;
  };

  return (
    <Pressable style={style} onPress={handlePress}>
      {children}
      <Animated.View
        style={[
          styles.heartContainer,
          { opacity: heartOpacity, transform: [{ scale: heartScale }] },
        ]}
        pointerEvents="none"
      >
        <Ionicons name="heart" size={60} color="#fff" />
      </Animated.View>
    </Pressable>
  );
}

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
        <DoubleTapImage style={{ width: itemSize, height: itemSize }}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {tab === "tagged" && (
            <View style={styles.tagBadge}>
              <Ionicons name="pricetag" size={10} color="#fff" />
            </View>
          )}
        </DoubleTapImage>
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
        <DoubleTapImage style={{ width: itemSize, height: itemSize * 1.5 }}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.reelOverlay}>
            <Ionicons name="play" size={16} color="#fff" />
            <Text style={styles.reelViews}>{item.views}</Text>
          </View>
        </DoubleTapImage>
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
  heartContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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
