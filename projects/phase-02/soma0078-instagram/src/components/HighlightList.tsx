import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Highlight } from "../types";

type HighlightListProps = {
  highlights: Highlight[];
};

export default function HighlightList({ highlights }: HighlightListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {highlights.map((item) => (
        <TouchableOpacity key={item.id} style={styles.item}>
          <View style={styles.ring}>
            <Image source={{ uri: item.coverImage }} style={styles.image} />
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 16,
  },
  item: {
    alignItems: "center",
    width: 64,
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    padding: 2,
    marginBottom: 4,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  title: {
    fontSize: 11,
    color: "#262626",
    textAlign: "center",
    width: 64,
  },
});
