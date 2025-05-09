import { useSubmission } from "@solidjs/router";
import { removeRecipeAction } from "~/lib/recipe";

export default function RemoveRecipe() {
  const removingRecipe = useSubmission(removeRecipeAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin - Remove Recipe
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={removeRecipeAction}
      >
        <div class="flex space-x-4">
          {/* Champ pour saisir l'ID de la recette */}
          <input
            type="number"
            name="id"
            placeholder="Recipe ID"
            class="border bg-white p-2 rounded flex-1"
            required
          />

          {/* Bouton pour soumettre */}
          <button
            type="submit"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove Recipe
          </button>
        </div>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {removingRecipe.pending && (
          <p class="text-blue-500">Removing recipe...</p>
        )}
        {removingRecipe.error && (
          <p class="text-red-500">Error: {removingRecipe.error.message}</p>
        )}
        {removingRecipe.result && (
          <p class="text-green-500">Recipe removed successfully!</p>
        )}
      </div>
    </main>
  );
}