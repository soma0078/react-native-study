import { FlatList, Dimensions, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PostCard from "../../components/PostCard";
import { MOCK_PROFILE_POSTS } from "../../data/mockProfile";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = width + 200;

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const initialIndex = MOCK_PROFILE_POSTS.findIndex((p) => p.id === id);

  return (
    <>
      <Stack.Screen
        options={{
          title: "게시물",
          headerShown: true,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} activeOpacity={1}>
              <Ionicons name="chevron-back" size={28} color="#262626" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={MOCK_PROFILE_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        initialScrollIndex={initialIndex >= 0 ? initialIndex : 0}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
      />
    </>
  );
}
