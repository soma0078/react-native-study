import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Activity } from "@/types/activity";
import { ActivityCard } from "./ActivityCard";

interface ActivityListProps {
  activities: Activity[];
  onActivityPress: (activity: Activity) => void;
}

export function ActivityList({
  activities,
  onActivityPress,
}: ActivityListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 추천 활동</Text>
      <FlatList
        data={activities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard activity={item} onPress={onActivityPress} />
        )}
        contentContainerStyle={styles.list}
        snapToInterval={172}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
});
