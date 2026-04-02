import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import PostGrid from "./PostGrid";
import { MOCK_GRID_POSTS } from "../data/mockProfile";

type Tab = "grid" | "reels" | "tagged";

const TABS: { key: Tab; icon: string; iconFocused: string }[] = [
  { key: "grid", icon: "grid-outline", iconFocused: "grid" },
  { key: "reels", icon: "film-outline", iconFocused: "film" },
  { key: "tagged", icon: "pricetag-outline", iconFocused: "pricetag" },
];

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / TABS.length;
const PAGER_HEIGHT = (width / 3) * Math.ceil(MOCK_GRID_POSTS.length / 3);

export default function ProfileTabs() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const position = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(0)).current;
  const indicatorTranslateX = Animated.add(position, offset).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, TAB_WIDTH, TAB_WIDTH * 2],
  });

  return (
    <>
      {/* 탭 바 */}
      <View style={styles.tabBar}>
        {TABS.map(({ key, icon, iconFocused }, index) => {
          const focused = activeIndex === index;
          return (
            <TouchableOpacity
              key={key}
              style={styles.tabItem}
              onPress={() => pagerRef.current?.setPage(index)}
            >
              <Ionicons
                name={(focused ? iconFocused : icon) as any}
                size={24}
                color={focused ? "#262626" : "#8e8e8e"}
              />
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.tabIndicator,
            { width: TAB_WIDTH, transform: [{ translateX: indicatorTranslateX }] },
          ]}
        />
      </View>

      {/* 페이저 */}
      <PagerView
        ref={pagerRef}
        style={{ height: PAGER_HEIGHT }}
        initialPage={0}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
        onPageScroll={Animated.event(
          [{ nativeEvent: { position, offset } }],
          { useNativeDriver: false }
        )}
      >
        <View key="grid">
          <PostGrid
            posts={MOCK_GRID_POSTS}
            onPress={(id) => router.push(`/post/${id}`)}
          />
        </View>

        <View key="reels" style={styles.empty}>
          <Ionicons name="film-outline" size={48} color="#dbdbdb" />
          <Text style={styles.emptyText}>릴스</Text>
        </View>

        <View key="tagged" style={styles.empty}>
          <Ionicons name="pricetag-outline" size={48} color="#dbdbdb" />
          <Text style={styles.emptyText}>태그된 게시물</Text>
        </View>
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#dbdbdb",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 1,
    backgroundColor: "#262626",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#8e8e8e",
  },
});
