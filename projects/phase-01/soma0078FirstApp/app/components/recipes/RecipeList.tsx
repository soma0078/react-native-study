import { getRecipes } from "@/app/api/recipes";
import { Recipe } from "@/app/types/recipes.type";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { RecipeItem } from "./RecipeItem";

export function RecipesList() {
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecipes();
        setData(res.recipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 px-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeItem item={item} />}
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
        {data.map((item) => (
          <RecipeItem key={item.id} item={item} />
        ))}
      </ScrollView> */}
    </View>
  );
}
