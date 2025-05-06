import { db } from './db'
import { query } from "@solidjs/router";

export const getRecipes = query(async () => {
  'use server'
  return await db.recipe.findMany()
}, 'getRecipes')