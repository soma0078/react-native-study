import { getRecipeById } from "@/api/recipes";
import { RecipeDetailContent } from "@/components/recipes/recipe-detail-content";
import { Recipe } from "@/types/recipes.type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RecipeDetailContentScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const data = await getRecipeById(id as string);
          setRecipe(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!recipe) return null;

  return <RecipeDetailContent recipe={recipe} />;
}
