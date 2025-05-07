import { db } from './db'
import { query } from "@solidjs/router";

export const getRecipes = query(async () => {
  'use server'
  const recipes = await db.recipe.findMany({
    include: {
      ingredients: true,
    },
  })
  return recipes;
}, 'getRecipes')

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