import { useRef } from "react";
import { View, Text, StyleSheet, Pressable, PanResponder, Animated } from "react-native";
import { COLORS } from "@/constants/theme";

const SWIPE_THRESHOLD = -60; // 이 거리 이상 스와이프하면 삭제 버튼 노출
const DELETE_BUTTON_WIDTH = 80;

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export default function SwipeableItem({
  children,
  onDelete,
}: SwipeableItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      // 수평 이동이 수직 이동보다 클 때만 인식 (스크롤 방해 방지)
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },

      // 제스처 이동 중
      onPanResponderMove: (_, gestureState) => {
        // 왼쪽 스와이프만 허용
        if (gestureState.dx < 0) {
          const clampedX = Math.max(gestureState.dx, -DELETE_BUTTON_WIDTH);
          translateX.setValue(clampedX);
        }
      },

      // 손을 뗐을 때
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          // 충분히 스와이프 → 삭제 버튼 노출
          Animated.spring(translateX, {
            toValue: -DELETE_BUTTON_WIDTH,
            useNativeDriver: true,
          }).start();
        } else {
          // 조금만 스와이프 → 원위치
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleDelete = () => {
    // 삭제 전 원위치 애니메이션
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      onDelete();
    });
  };

  return (
    <View style={styles.container}>
      {/* 뒤에 깔리는 삭제 버튼 */}
      <Pressable style={styles.deleteButtonContainer} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </Pressable>

      {/* 스와이프되는 콘텐츠 */}
      <Animated.View
        style={[styles.content, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  deleteButtonContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: DELETE_BUTTON_WIDTH,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
});
