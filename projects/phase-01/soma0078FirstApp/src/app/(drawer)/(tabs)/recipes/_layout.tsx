import { Stack } from "expo-router";

export const unstable_setting = {
  initialRountName: "index",
};

export default function RecipesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
