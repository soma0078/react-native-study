import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Story } from "../types";

type StoryListProps = {
  stories: Story[];
};

export default function StoryList({ stories }: StoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {stories.map((story) => (
        <View key={story.id} style={styles.storyItem}>
          <View style={[styles.ring, story.isMe && styles.noRing]}>
            <Image
              source={{ uri: story.user.profileImage }}
              style={styles.image}
            />
          </View>
          {story.isMe && (
            <View style={styles.addBadge}>
              <Text style={styles.addIcon}>+</Text>
            </View>
          )}
          <Text style={styles.name} numberOfLines={1}>
            {story.user.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 12,
  },
  storyItem: {
    alignItems: "center",
    width: 66,
  },
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    borderWidth: 2,
    borderColor: "#c13584",
    marginBottom: 4,
  },
  noRing: {
    borderColor: "#dbdbdb",
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#fff",
  },
  addBadge: {
    position: "absolute",
    bottom: 20,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  addIcon: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  name: {
    fontSize: 11,
    color: "#262626",
    textAlign: "center",
    width: 66,
  },
});
