import { useCallback, useRef } from "react";
import {
  Animated,
  Pressable,
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

// ── 상수 ──────────────────────────────────────────────────────────
const COLORS = {
  bg: "#000",
  tabActive: "#fff",
  tabInactive: "#666",
  border: "#333",
} as const;

const TAB_ICON_SIZE = 22;
const TAB_INDICATOR_HEIGHT = 1;

// ── 탭 정의 ───────────────────────────────────────────────────────
type Tab = "posts" | "reels" | "tagged";

const TABS: { key: Tab; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "posts", icon: "grid-outline" },
  { key: "reels", icon: "play-circle-outline" },
  { key: "tagged", icon: "person-outline" },
];

// ── TabBar ────────────────────────────────────────────────────────
type TabBarProps = {
  scrollX: Animated.Value;
  width: number;
  onTabPress: (index: number) => void;
};

function TabBar({ scrollX, width, onTabPress }: TabBarProps) {
  return (
    <View style={styles.tabs}>
      {TABS.map((tab, i) => {
        // 인디케이터 opacity: 해당 탭이 active일 때만 1
        const indicatorOpacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });

        // 아이콘 색상: active 탭은 밝게, 나머지는 어둡게
        // Ionicons color prop은 Animated.Value를 받지 않으므로
        // 흰색 아이콘을 opacity로 페이드
        const activeIconOpacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });

        return (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [styles.tabItem, pressed && { opacity: 0.7 }]}
            onPress={() => onTabPress(i)}
          >
            {/* 비활성 아이콘 (항상 렌더) */}
            <Ionicons
              name={tab.icon}
              size={TAB_ICON_SIZE}
              color={COLORS.tabInactive}
            />
            {/* 활성 아이콘 (opacity로 페이드인) */}
            <Animated.View
              style={[styles.tabIconOverlay, { opacity: activeIconOpacity }]}
              pointerEvents="none"
            >
              <Ionicons
                name={tab.icon}
                size={TAB_ICON_SIZE}
                color={COLORS.tabActive}
              />
            </Animated.View>
            <Animated.View
              style={[styles.tabIndicator, { opacity: indicatorOpacity }]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

// ── ProfileScreen ─────────────────────────────────────────────────
export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  // scrollX: 탭 상태의 단일 소스 — 탭 클릭/스와이프 모두 이 값으로 구동
  const scrollX = useRef(new Animated.Value(0)).current;
  const swipeRef = useRef<Animated.LegacyRef<any>>(null);

  const handleTabPress = useCallback(
    (index: number) => {
      (swipeRef.current as any)?.scrollTo({ x: width * index, animated: true });
    },
    [width]
  );

  const handleSwipeScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* 상단 헤더 바 — 항상 고정 */}
      <View style={styles.topBar}>
        <Ionicons name="chevron-back" size={24} color={COLORS.tabActive} />
        <Text style={styles.topBarTitle}>insta</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.tabActive} />
      </View>

      {/*
        Animated.ScrollView (vertical):
          children[0] = ProfileHeader  — 스크롤과 함께 올라감
          children[1] = TabBar         — stickyHeaderIndices={[1]} 로 sticky
          children[2] = 수평 스와이프

        stickyHeaderIndices는 children 배열 기준이므로 ListHeaderComponent 없이
        직접 children으로 나열해야 인덱스가 예측 가능하다.
      */}
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        {/* [0] 프로필 헤더 */}
        <ProfileHeader />

        {/* [1] 탭 바 — sticky */}
        <TabBar scrollX={scrollX} width={width} onTabPress={handleTabPress} />

        {/* [2] 수평 스와이프 */}
        <Animated.ScrollView
          ref={swipeRef as any}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={handleSwipeScroll}
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
        </Animated.ScrollView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// ── 스타일 ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.bg,
  },
  topBarTitle: {
    color: COLORS.tabActive,
    fontWeight: "700",
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  tabIconOverlay: {
    position: "absolute",
    top: 10,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_INDICATOR_HEIGHT,
    backgroundColor: COLORS.tabActive,
  },
});
