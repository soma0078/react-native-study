import { FlatList, Text, View, ScrollView } from "react-native";

import { Recipe } from "@/types/recipes.type";
import { RecipeListItem } from "./recipe-list-item";

export function RecipesList({ recipes }: { recipes: Recipe[] }) {
  return (
    <View className="flex-1 bg-gray-50 px-4">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeListItem item={item} />}
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-gray-900 mt-6 mb-4">
            Dinners
          </Text>
        }
        // stickyHeaderIndices={[0]}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {recipes.map((item) => (
          <RecipeItem key={item.id} item={item} />
        ))}
      </ScrollView> */}
    </View>
  );
}
