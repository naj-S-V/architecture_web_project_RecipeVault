import { useSubmission } from "@solidjs/router";
import { addRecipeAction } from "~/lib/recipe";

export default function Admin() {
  const addingRecipe = useSubmission(addRecipeAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin - Add Recipe
      </h1>

      <form class="my-4 space-y-4" method="post" action={addRecipeAction}>
        {/* Titre de la recette */}
        <input
          name="title"
          type="text"
          placeholder="Recipe Title"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Durée de la recette */}
        <input
          name="duration"
          type="number"
          placeholder="Duration (minutes)"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Ingrédients */}
        <textarea
          name="ingredients"
          placeholder='Ingredients (e.g., [{"name":"Tomato","quantity":2,"unit":"pcs"}])'
          class="border bg-white p-2 rounded w-full"
          required
        ></textarea>

        {/* Étapes */}
        <textarea
          name="steps"
          placeholder="Steps (comma-separated, e.g., Step 1, Step 2, Step 3)"
          class="border bg-white p-2 rounded w-full"
          required
        ></textarea>

        {/* Bouton pour soumettre */}
        <button
          type="submit"
          class="bg-green-600 text-white p-2 rounded w-full"
        >
          Add Recipe
        </button>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {addingRecipe.pending && (
          <p class="text-blue-500">Adding recipe...</p>
        )}
        {addingRecipe.error && (
          <p class="text-red-500">Error: {addingRecipe.error.message}</p>
        )}
        {addingRecipe.result && (
          <p class="text-green-500">Recipe added successfully!</p>
        )}
      </div>
    </main>
  );
}