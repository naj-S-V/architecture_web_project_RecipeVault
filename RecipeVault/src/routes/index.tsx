import { createSignal, createResource, Show, For } from "solid-js";
import RecipeBox from "../components/RecipeBox";
import { getRecipesWithIngredients } from "../lib/recipe";
import { useSearchParams,createAsync } from "@solidjs/router";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams(); // Gère les paramètres de l'URL

  // Récupère les ingrédients depuis l'URL ou initialise une liste vide
  const ingredients = () => {
    const ingredientsParam = searchParams.ingredient;
    if (!ingredientsParam) return [];
    return Array.isArray(ingredientsParam) ? ingredientsParam : [ingredientsParam];
  }

  const recipes = createAsync(async () => {
    if (ingredients().length === 0) return []; // Si aucun ingrédient, retourner une liste vide
    const recipes = await getRecipesWithIngredients(ingredients()); // Appelle la fonction mise à jour
    return recipes;
  });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        What is in your fridge?
      </h1>

      <form class="my-4" method="get">
        <input
          type="text"
          name="ingredient"
          placeholder="Add an ingredient..."
          class="border bg-white p-2 rounded mr-2"
        />
        <For each={ingredients()}>
          {(ingredient) => <input type="hidden" name="ingredient" value={ingredient} />}
        </For>
        <button
          type="submit"
          class="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded mr-2"
        >
          Add
        </button> 
      </form>

      <div class="my-4">
        <h2 class="text-lg font-semibold text-white">Ingredients List:</h2>
        <Show
          when={ingredients().length > 0}
          fallback={<p class="text-gray-400">No ingredients added yet.</p>}
        >
          <ul class="list-disc list-inside text-white">
            {ingredients().map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <button
            class="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded mt-5"
          >
            Remove ingredients
          </button>
        </Show>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes()?.map((recipe) => (
          <RecipeBox
            id={recipe.id}
            title={recipe.title}
            duration={recipe.duration}
            ingredients={recipe.ingredients.map((ingredient) => ingredient.name)} // Affiche les noms des ingrédients
          />
        ))}
      </div>
    </main>
  );
}