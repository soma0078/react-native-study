import { Recipe } from "@/types/recipes.type";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface RecipeListItemProps {
  item: Recipe;
}

export function RecipeListItem({ item }: RecipeListItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/recipes/${item.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View className="flex-row p-4 mb-3 bg-white rounded-2xl shadow-sm items-center border border-gray-100">
        {/* Recipe Image */}
        <View className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Recipe Info */}
        <View className="flex-1 ml-4 justify-between py-1">
          <View>
            <Text className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">
              {item.cuisine}
            </Text>
            <Text
              className="text-lg font-bold text-gray-800 leading-tight"
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Text className="text-yellow-500 text-sm">⭐ {item.rating}</Text>
            <Text className="text-gray-400 text-xs ml-2">
              ({item.reviewCount} reviews)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
