import { Recipe } from "@/types/recipes.type";
import { Image, ScrollView, Text, View } from "react-native";

export function RecipeDetailContent({ recipe }: { recipe: Recipe }) {
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* Recipe Image */}
      <View className="w-full h-80">
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Detail Overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <Text className="text-white text-xs font-bold uppercase tracking-widest mb-1">
            {recipe.cuisine} • {recipe.difficulty}
          </Text>
          <Text className="text-white text-3xl font-extrabold leading-tight">
            {recipe.name}
          </Text>
        </View>
      </View>

      <View className="p-6">
        {/* Quick Stats */}
        <View className="flex-row justify-between items-center mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <View className="items-center">
            <Text className="text-orange-500 font-bold text-lg">
              {recipe.prepTimeMinutes}m
            </Text>
            <Text className="text-gray-400 text-xs">Prep</Text>
          </View>
          <View className="w-[1px] h-8 bg-gray-200" />
          <View className="items-center">
            <Text className="text-orange-500 font-bold text-lg">
              {recipe.cookTimeMinutes}m
            </Text>
            <Text className="text-gray-400 text-xs">Cook</Text>
          </View>
          <View className="w-[1px] h-8 bg-gray-200" />
          <View className="items-center">
            <Text className="text-orange-500 font-bold text-lg">
              ⭐ {recipe.rating}
            </Text>
            <Text className="text-gray-400 text-xs">Rating</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Ingredients
          </Text>
          <View className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-orange-400 mr-3" />
                <Text className="text-gray-700 text-base flex-1">
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Instructions
          </Text>
          <View className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <View key={index} className="flex-row">
                <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-4">
                  <Text className="text-orange-600 font-bold">{index + 1}</Text>
                </View>
                <Text className="text-gray-700 text-base leading-relaxed flex-1">
                  {instruction}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
