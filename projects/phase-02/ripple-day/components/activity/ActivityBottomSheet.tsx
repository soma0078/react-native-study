import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Activity, ChecklistItem } from "@/types/activity";
import { getScoreColor } from "@/constants/activities";

interface ActivityBottomSheetProps {
  activity: Activity | null;
  onClose: () => void;
}

export function ActivityBottomSheet({
  activity,
  onClose,
}: ActivityBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const itemAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (activity) {
      const freshItems = activity.items.map((item) => ({
        ...item,
        checked: false,
      }));
      setItems(freshItems);
      itemAnimations.current = freshItems.map(() => new Animated.Value(0));

      bottomSheetRef.current?.expand();

      // 준비물 순차 애니메이션
      const animations = itemAnimations.current.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 12,
        }),
      );
      Animated.stagger(120, animations).start();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [activity]);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose],
  );

  const scoreColor = activity
    ? getScoreColor(activity.suitabilityScore)
    : "#fff";

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        {activity && (
          <>
            {/* 헤더 */}
            <View style={styles.header}>
              <Text style={styles.emoji}>{activity.emoji}</Text>
              <View style={styles.headerText}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <View style={[styles.scoreBadge, { borderColor: scoreColor }]}>
                  <Text style={[styles.scoreText, { color: scoreColor }]}>
                    적합도 {activity.suitabilityScore}점
                  </Text>
                </View>
              </View>
            </View>

            {/* 설명 */}
            <Text style={styles.description}>{activity.description}</Text>

            {/* 소요시간 */}
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>⏱</Text>
              <Text style={styles.infoLabel}>소요시간</Text>
              <Text style={styles.infoValue}>{activity.duration}</Text>
            </View>

            {/* 준비물 체크리스트 */}
            <Text style={styles.checklistTitle}>준비물 체크리스트</Text>
            {items.map((item, index) => {
              const anim = itemAnimations.current[index];
              if (!anim) return null;
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.checklistItem,
                    {
                      opacity: anim,
                      transform: [
                        {
                          translateX: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                          }),
                        },
                        {
                          scale: anim.interpolate({
                            inputRange: [0, 0.8, 1],
                            outputRange: [0.8, 1.05, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.checklistRow}
                    onPress={() => toggleItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        item.checked && styles.checkboxChecked,
                      ]}
                    >
                      {item.checked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text
                      style={[
                        styles.checklistLabel,
                        item.checked && styles.checklistLabelChecked,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}

            <View style={styles.spacer} />
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#0f1f3d",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 44,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  activityName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  scoreBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 22,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  checklistTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 14,
  },
  checklistItem: {
    marginBottom: 10,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  checkmark: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  checklistLabel: {
    fontSize: 15,
    color: "#fff",
    flex: 1,
  },
  checklistLabelChecked: {
    color: "rgba(255,255,255,0.4)",
    textDecorationLine: "line-through",
  },
  spacer: {
    height: 20,
  },
});
