import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Activity } from "@/types/activity";

interface ActivityCardProps {
  activity: Activity;
  onPress: (activity: Activity) => void;
}

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const rotateY = useRef(new Animated.Value(0)).current;

  const springIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const springOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > 5 || Math.abs(dy) > 5,
      onPanResponderGrant: () => {
        springIn();
      },
      onPanResponderMove: (_, { dx }) => {
        rotateY.setValue(dx * 0.02);
      },
      onPanResponderRelease: () => {
        springOut();
        Animated.spring(rotateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }).start();
      },
    }),
  ).current;

  const scoreColor = getScoreColor(activity.suitabilityScore);

  return (
    <Pressable
      onPressIn={springIn}
      onPressOut={springOut}
      onPress={() => onPress(activity)}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { scale },
              {
                perspective: 800,
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.emoji}>{activity.emoji}</Text>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>

        <View style={styles.footer}>
          <View
            style={[styles.scoreBadge, { backgroundColor: scoreColor + "33" }]}
          >
            <Text style={[styles.scoreText, { color: scoreColor }]}>
              {activity.suitabilityScore}점
            </Text>
          </View>
          <Text style={styles.duration}>{activity.duration}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#4caf50";
  if (score >= 60) return "#ff9800";
  return "#f44336";
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "600",
  },
  duration: {
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
  },
});
