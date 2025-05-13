import type { APIEvent } from "@solidjs/start/server";
import { getRecipesWithIngredients } from "~/lib/recipe";

export async function POST(event: APIEvent) {
    const data = await event.request.formData();
    
    const ingredients = (data.get('ingredients') as string).split(',').map((ingredient) => ingredient.trim());
    return await getRecipesWithIngredients(ingredients);
}