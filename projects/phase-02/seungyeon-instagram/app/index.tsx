import { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProfileHeader from "../components/ProfileHeader";
import PostGrid from "../components/PostGrid";
import { POSTS, TAGGED } from "../data/dummy";

type Tab = "posts" | "reels" | "tagged";
const TABS: { key: Tab; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "posts", icon: "grid-outline" },
  { key: "reels", icon: "play-circle-outline" },
  { key: "tagged", icon: "person-outline" },
];

type ListItem = { type: "tabs" } | { type: "content" };
const LIST_DATA: ListItem[] = [{ type: "tabs" }, { type: "content" }];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const swipeRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const handleTabPress = (key: Tab, index: number) => {
    setActiveTab(key);
    swipeRef.current?.scrollTo({ x: width * index, animated: true });
  };

  const handleSwipeEnd = (x: number) => {
    const index = Math.round(x / width);
    const clamped = Math.max(0, Math.min(TABS.length - 1, index));
    setActiveTab(TABS[clamped].key);
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === "tabs") {
      return (
        <View style={styles.tabs}>
          {TABS.map((tab, i) => (
            <Pressable
              key={tab.key}
              style={({ pressed }) => [styles.tabItem, pressed && { opacity: 0.7 }]}
              onPress={() => handleTabPress(tab.key, i)}
            >
              <Ionicons
                name={tab.icon}
                size={22}
                color={activeTab === tab.key ? "#fff" : "#666"}
              />
              {activeTab === tab.key && <View style={styles.tabIndicator} />}
            </Pressable>
          ))}
        </View>
      );
    }

    // 수평 스와이프 영역 - width 동적으로
    return (
      <ScrollView
        ref={swipeRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          handleSwipeEnd(e.nativeEvent.contentOffset.x)
        }
      >
        <View style={{ width }}>
          <PostGrid tab="posts" data={POSTS} />
        </View>
        <View style={{ width }}>
          <PostGrid tab="reels" data={[]} />
        </View>
        <View style={{ width }}>
          <PostGrid tab="tagged" data={TAGGED} />
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* 상단 헤더 바 - 항상 고정 */}
      <View style={styles.topBar}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
        <Text style={styles.topBarTitle}>insta</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
      </View>

      {/*
        FlatList:
        - ListHeaderComponent = ProfileHeader (스크롤에 포함, 위로 올라감)
        - index 0 = tabs → stickyHeaderIndices={[0]} 로 스티키
        - index 1 = content (수평 스와이프)
      */}
      <FlatList
        data={LIST_DATA}
        keyExtractor={(item) => item.type}
        renderItem={renderItem}
        ListHeaderComponent={<ProfileHeader />}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        scrollEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  topBarTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#fff",
  },
});
