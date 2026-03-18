import { api } from "./apiService";
import { RecipesResponse } from "../types/recipes.type";

export const getRecipes = async (): Promise<RecipesResponse> => {
  try {
    const response = await api.get<RecipesResponse>("/recipes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
