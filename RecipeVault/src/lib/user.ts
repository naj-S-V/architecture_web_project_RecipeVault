import { db } from './db'
import { action, query } from "@solidjs/router";
import bcrypt from 'bcryptjs';
import { getSession } from './session';
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean().optional(),
})

export const getUsers = query(async () => {
  'use server'
  return await db.user.findMany()
}, 'getUsers')

export const register = async (form: FormData) => {
  'use server'

  // Parse les données du formulaire
  const user = userSchema.parse(Object.fromEntries(form.entries()));

  // Hash le mot de passe
  user.password = await bcrypt.hash(user.password, 10);

  // Insère l'utilisateur dans la base de données
  return db.user.create({ data: user });
}
export const registerAction = action(register)

export const login = async (form: FormData) => {
  'use server'

  // Parse les données du formulaire
  const { email, password } = userSchema.parse(Object.fromEntries(form.entries()));

  const record = await db.user.findUniqueOrThrow({ where: { email } })
  const loggedIn = await bcrypt.compare(password, record.password)

  if (loggedIn) {
    const session = await getSession();
    session.update({ userEmail: email });
  }
}
export const loginAction = action(login)

export const getUserConnected = query(async () => {
  'use server'
  try {
    const session = await getSession()
    if (!session.data.userEmail) {
      return null
    }
    return await db.user.findUniqueOrThrow({
      where: { email: session.data.userEmail },
    })
  } catch {
    return null
  }
}, 'getUserConnected')