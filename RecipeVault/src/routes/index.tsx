import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import RecipeBox from "../components/RecipeBox";


export default function Home() {
  const [recipes] = createSignal([
    {
      title: "Spaghetti Bolognese",
      duration: 45,
      ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef", "Onion", "Garlic"],
    },
    {
      title: "Caesar Salad",
      duration: 15,
      ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
    },
    {
      title: "Pancakes",
      duration: 20,
      ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
    },
  ]);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">

      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        What is in your fridge ?
      </h1>

      <div class="my-4">
        <input
          type="text"
          placeholder="Search for ingredients..."
          class="border bg-white p-2 rounded mr-2"
        />
        <button class="bg-sky-600 text-white p-2 rounded">Add</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes().map((recipe) => (
          <RecipeBox
            title={recipe.title}
            duration={recipe.duration}
            ingredients={recipe.ingredients}
          />
        ))}
      </div>

    </main>
  );
}
