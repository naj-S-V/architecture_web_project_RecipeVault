import { db } from './db'
import { query, action } from "@solidjs/router";
import { z } from 'zod';

const recipeSchema = z.object({
  title: z.string(),
  duration: z.coerce.number(),
  ingredients: z.string().transform(val => {
    return JSON.parse(val) as {name: string, quantity: number, unit: string}[]
  }),
  steps: z.string().transform(s => s.split(',')),
});

export const addRecipe = async (form: FormData) => {
  'use server';

  // Parse les données du formulaire
  const recipe = recipeSchema.parse(Object.fromEntries(form.entries()));

  // Insère la recette dans la base de données
  return await db.recipe.create({
    data: {
      ...recipe,
      ingredients: {
        create: recipe.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })),
      },
    },
  });
};
export const addRecipeAction = action(addRecipe)

export const getRecipes = query(async () => {
  'use server'
  const recipes = await db.recipe.findMany({
    include: {
      ingredients: true,
    },
  })
  return recipes;
}, 'getRecipes')

export const getRecipeById = query(async (id: number) => {
  'use server'
  const recipe = await db.recipe.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
    },
  })
  return recipe;
}, 'getRecipeById')

export const getRecipesWithIngredients = query(async (ingredients: string[]) => {
  'use server'
  const recipes = await db.recipe.findMany({
    where: {
      ingredients: {
        some: {
          name: {
            in: ingredients,
          },
        },
      },
    },
    include: {
      ingredients: true,
    },
  })
  return recipes;
}, 'getRecipesWithIngredients')

export const removeRecipe = async (form: FormData) => {
  'use server';
  const id = Number(form.get('id'));
  return await db.recipe.delete({
    where: { id }, 
  });
};
export const removeRecipeAction = action(removeRecipe);