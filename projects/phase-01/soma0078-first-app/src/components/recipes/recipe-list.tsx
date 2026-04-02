import { FlatList, Text, View, ScrollView } from "react-native";

import { Recipe } from "@/types/recipes.type";
import { RecipeListItem } from "./recipe-list-item";
import { SafeAreaView } from "react-native-safe-area-context";

export function RecipesList({ recipes }: { recipes: Recipe[] }) {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeListItem item={item} />}
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
        // stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-gray-900 mt-6 mb-4">
            Dinners
          </Text>
        }
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {recipes.map((item) => (
          <RecipeItem key={item.id} item={item} />
        ))}
      </ScrollView> */}
    </SafeAreaView>
  );
}
