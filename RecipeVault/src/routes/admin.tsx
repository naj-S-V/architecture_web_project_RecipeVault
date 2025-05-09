import { createSignal } from "solid-js";
import { useSubmission } from "@solidjs/router";
import { addRecipeAction } from "~/lib/recipe";

export default function Admin() {
  const addingRecipe = useSubmission(addRecipeAction);

  // Signal pour stocker les ingrédients
  const [ingredients, setIngredients] = createSignal<
    { name: string; quantity: number; unit: string }[]
  >([]);

  // Signal pour stocker les steps
  const [steps, setSteps] = createSignal<string[]>([]);

  // Ajouter un ingrédient à la liste
  const addIngredient = (name: string, quantity: number, unit: string) => {
    setIngredients([...ingredients(), { name, quantity, unit }]);
  };

  // Supprimer un ingrédient de la liste
  const removeIngredient = (index: number) => {
    setIngredients(ingredients().filter((_, i) => i !== index));
  };

  // Ajouter une étape à la liste
  const addStep = (step: string) => {
    setSteps([...steps(), step]);
  };

  // Supprimer une étape de la liste
  const removeStep = (index: number) => {
    setSteps(steps().filter((_, i) => i !== index));
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin - Add Recipe
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={addRecipeAction}
        onSubmit={(e) => {
          // Avant l'envoi, transformer les ingrédients et les steps en JSON
          const form = e.currentTarget as HTMLFormElement;
          const ingredientsInput = form.querySelector(
            'input[name="ingredients"]'
          ) as HTMLInputElement;
          const stepsInput = form.querySelector(
            'input[name="steps"]'
          ) as HTMLInputElement;

          ingredientsInput.value = JSON.stringify(ingredients());
          stepsInput.value = JSON.stringify(steps());
        }}
      >
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
        <div class="space-y-2">
          <h2 class="text-lg text-white font-semibold">Ingredients</h2>
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="Ingredient Name"
              class="border bg-white p-2 rounded flex-1"
              id="ingredient-name"
            />
            <input
              type="number"
              placeholder="Quantity"
              class="border bg-white p-2 rounded w-24"
              id="ingredient-quantity"
            />
            <input
              type="text"
              placeholder="Unit (e.g., g, pcs)"
              class="border bg-white p-2 rounded w-24"
              id="ingredient-unit"
            />
            <button
              type="button"
              class="bg-blue-600 text-white p-2 rounded"
              onClick={() => {
                const name = (
                  document.getElementById("ingredient-name") as HTMLInputElement
                ).value;
                const quantity = Number(
                  (
                    document.getElementById(
                      "ingredient-quantity"
                    ) as HTMLInputElement
                  ).value
                );
                const unit = (
                  document.getElementById("ingredient-unit") as HTMLInputElement
                ).value;

                if (name && quantity && unit) {
                  addIngredient(name, quantity, unit);
                  // Réinitialiser les champs
                  (
                    document.getElementById(
                      "ingredient-name"
                    ) as HTMLInputElement
                  ).value = "";
                  (
                    document.getElementById(
                      "ingredient-quantity"
                    ) as HTMLInputElement
                  ).value = "";
                  (
                    document.getElementById(
                      "ingredient-unit"
                    ) as HTMLInputElement
                  ).value = "";
                }
              }}
            >
              Add
            </button>
          </div>

          {/* Liste des ingrédients */}
          <ul class="list-disc list-inside text-left">
            {ingredients().map((ingredient, index) => (
              <li class="flex justify-between items-center">
                <span class="text-gray-100">
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </span>
                <button
                  type="button"
                  class="text-red-600"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Champ caché pour les ingrédients */}
        <input type="hidden" name="ingredients" />

        {/* Étapes */}
        <div class="space-y-2">
          <h2 class="text-lg text-white font-semibold">Steps</h2>
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="Step Description"
              class="border bg-white p-2 rounded flex-1"
              id="step-description"
            />
            <button
              type="button"
              class="bg-blue-600 text-white p-2 rounded"
              onClick={() => {
                const step = (
                  document.getElementById("step-description") as HTMLInputElement
                ).value;

                if (step) {
                  addStep(step);
                  // Réinitialiser le champ
                  (
                    document.getElementById(
                      "step-description"
                    ) as HTMLInputElement
                  ).value = "";
                }
              }}
            >
              Add
            </button>
          </div>

          {/* Liste des steps */}
          <ul class="list-disc list-inside text-left">
            {steps().map((step, index) => (
              <li class="flex justify-between items-center">
                <span class="text-gray-100">{step}</span>
                <button
                  type="button"
                  class="text-red-600"
                  onClick={() => removeStep(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Champ caché pour les steps */}
        <input type="hidden" name="steps" />

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