import { getRecipes } from "@/api/recipes";
import { RecipesList } from "@/components/recipes/recipe-list";
import { Recipe } from "@/types/recipes.type";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RecipeListScreen() {
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
  return <RecipesList recipes={data} />;
}
