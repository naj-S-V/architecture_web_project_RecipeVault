import type { APIEvent } from "@solidjs/start/server";
import { getRecipes } from "~/lib/recipe";

export async function GET(event: APIEvent) {
    return await getRecipes();
}