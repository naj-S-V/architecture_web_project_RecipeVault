type RecipeProps = {
    title: string;
    duration: number;
    ingredients: string[];
  };
  
  export default function RecipeBox({ title, duration, ingredients }: RecipeProps) {
    return (
      <div class="border rounded-lg p-4 bg-white shadow-md">
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