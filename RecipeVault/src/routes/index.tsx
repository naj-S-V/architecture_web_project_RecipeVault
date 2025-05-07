import { createSignal, createResource, Show } from "solid-js";
import RecipeBox from "../components/RecipeBox";
import { getRecipesWithIngredients } from "../lib/recipe";

export default function Home() {
  const [ingredientInput, setIngredientInput] = createSignal(""); // Stocke la valeur de l'input
  const [ingredientsList, setIngredientsList] = createSignal<string[]>([]); // Liste des ingrédients ajoutés

  // Ajouter un ingrédient à la liste
  const addIngredient = () => {
    const ingredient = ingredientInput().trim();
    if (ingredient && !ingredientsList().includes(ingredient)) {
      setIngredientsList([...ingredientsList(), ingredient]);
    }
    setIngredientInput(""); // Réinitialise l'input
  };

  const removeAllIngredients = () => {
    setIngredientsList([]); // Réinitialise la liste des ingrédients
  }

  const [recipes] = createResource(ingredientsList, async (ingredients) => {
    if (ingredients.length === 0) return []; // Si aucun ingrédient, retourner une liste vide
    const recipes = await getRecipesWithIngredients(ingredients); // Appelle la fonction mise à jour
    return recipes; // Retourne directement les recettes
  });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        What is in your fridge?
      </h1>

      <div class="my-4">
        <input
          type="text"
          placeholder="Add an ingredient..."
          class="border bg-white p-2 rounded mr-2"
          value={ingredientInput()}
          onInput={(e) => setIngredientInput(e.currentTarget.value)} // Met à jour l'input
        />
        <button
          class="bg-sky-600 text-white p-2 rounded mr-2"
          onClick={addIngredient} // Ajoute l'ingrédient
        >
          Add
        </button>

      </div>

      <div class="my-4">

        <h2 class="text-lg font-semibold text-white">Ingredients List:</h2>

        <Show
          when={ingredientsList().length > 0}
          fallback={<p class="text-gray-400">No ingredients added yet.</p>}>

          <ul class="list-disc list-inside text-white">
            {ingredientsList().map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          
          <button
            class="bg-red-600 text-white p-2 rounded mt-5"
            onClick={removeAllIngredients}
          >
            Remove alls
          </button>
        </Show>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes()?.map((recipe) => (
          <RecipeBox
            title={recipe.title}
            duration={recipe.duration}
            ingredients={recipe.ingredients.map((ingredient) => ingredient.name)} // Affiche les noms des ingrédients
          />
        ))}
      </div>
    </main>
  );
}