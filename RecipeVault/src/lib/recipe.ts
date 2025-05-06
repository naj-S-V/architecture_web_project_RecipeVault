import { db } from './db'
import { query } from "@solidjs/router";

export const getRecipes = query(async () => {
  'use server'
  const recipes = await db.recipe.findMany({
    include: {
      ingredients: true,
    },
  })
}, 'getRecipes')