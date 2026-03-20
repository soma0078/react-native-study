import { api } from "./apiService";
import { RecipesResponse, Recipe } from "../types/recipes.type";

export const getRecipes = async (): Promise<RecipesResponse> => {
  try {
    const response = await api.get<RecipesResponse>("/recipes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    throw error;
  }
};
