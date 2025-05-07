import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { getRecipeById } from "~/lib/recipe";
import { useNavigate } from "@solidjs/router";

export default function RecipePage() {
    const params = useParams();
    const [recipe] = createResource(() => Number(params.id), getRecipeById); // Charge la recette par ID
    const navigate = useNavigate();

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <div class="relative">
                <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
                    Recipe Details
                </h1>
            </div>

            <Show when={recipe()} fallback={<p>Loading...</p>}>
                {(recipe) => {
                    return (
                        <div class="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto relative">
                            <button
                                class="absolute top-4 right-4 bg-black text-white p-2 rounded"
                                onClick={() => navigate(-1)}
                            >
                                X
                            </button>
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">{recipe().title}</h2>
                            <p class="text-gray-600 mb-4">Duration: {recipe().duration} minutes</p>
                            <h3 class="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
                            <ul class="list-disc list-inside text-gray-600 mb-4">
                                {recipe().ingredients.map((ingredient) => (
                                    <li>
                                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                    </li>
                                ))}
                            </ul>
                            <h3 class="text-lg font-semibold text-gray-700 mb-2">Steps:</h3>
                            <ol class="list-decimal list-inside text-gray-600">
                                {(recipe().steps as string[])?.map((step) => (
                                    <li>{step}</li>
                                ))}
                            </ol>
                        </div>
                    );
                }}
            </Show>
        </main>
    );
}