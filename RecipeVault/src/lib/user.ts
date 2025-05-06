import { db } from './db'
import { query } from "@solidjs/router";

export const getUsers = query(async () => {
  'use server'
  return await db.user.findMany()
}, 'getUsers')