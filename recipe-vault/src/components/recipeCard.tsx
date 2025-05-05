interface RecipeCardProps {
    title: string;
    ingredients: string[];
  }
  
  export function RecipeCard({ title, ingredients }: RecipeCardProps) {
    return (
      <div className="border p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">Ingrédients: {ingredients.join(", ")}</p>
      </div>
    );
  }
  