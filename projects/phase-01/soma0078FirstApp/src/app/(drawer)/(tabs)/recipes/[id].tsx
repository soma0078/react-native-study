import RecipeDetailContentScreen from "@/screens/recipes/recipe-detail-content-screen";
import { Stack } from "expo-router";

export default function RecipeDetailScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RecipeDetailContentScreen />
    </>
  );
}
