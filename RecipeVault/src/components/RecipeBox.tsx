import { useNavigate } from "@solidjs/router";

type RecipeProps = {
  id: number;
  title: string;
  duration: number;
  ingredients: string[];
};

export default function RecipeBox({ id, title, duration, ingredients }: RecipeProps) {
  const navigate = useNavigate();

  return (
    <div class="border rounded-lg p-4 bg-white shadow-md"
      onClick={() => navigate(`/recipe/${id}`)} // Affiche une alerte avec le titre de la recette
    >
      <h2 class="text-xl font-bold text-gray-800">{title}</h2>
      <p class="text-gray-600">Duration: {duration} minutes</p>
      <h3 class="mt-2 font-semibold text-gray-700">Ingredients:</h3>
      <ul class="list-disc list-inside text-gray-600">
        {ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}