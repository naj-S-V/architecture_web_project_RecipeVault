import { createResource } from "solid-js";
import RecipeBox from "../components/RecipeBox";
import { getRecipes } from "../lib/recipe";
import { createAsyncStore, RouteDefinition } from "@solidjs/router";

export const route = {
  preload() {
    getRecipes();
  },
} satisfies RouteDefinition;

export default function Recipes() {
  const recipes = createAsyncStore(() => getRecipes(), {
    initialValue: [],
  });
  
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">All Recipes</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes()?.map((recipe) => (
          <RecipeBox
            id={recipe.id}
            title={recipe.title}
            duration={recipe.duration}
            ingredients={recipe.ingredients.map((ingredient) => ingredient.name)}
          />
        ))}
      </div>
    </main>
  );
}