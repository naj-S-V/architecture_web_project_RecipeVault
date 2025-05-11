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

export const addUser = async (form: FormData) => {
  'use server'

  // Parse les données du formulaire
  const formData = Object.fromEntries(form.entries());
  const newData = {
    email: formData.email,
    password: formData.password,
    isAdmin : formData.isAdmin === "on" ? true : false,
  }

  const user = userSchema.parse(newData);

  // Hash le mot de passe
  user.password = await bcrypt.hash(user.password, 10);

  // Insère l'utilisateur dans la base de données
  return db.user.create({ data: user });
}
export const addUserAction = action(addUser)

















//---------------------------------------------------------------------

export const isConnectedUserAdmin = query(async (email: string) => {
  'use server'
  const user = await db.user.findUniqueOrThrow({
    where: { email },
  })
  return user.isAdmin
}, 'isUserAdmin')

export const login = async (form: FormData) => {
  'use server'

  const { email, password } = userSchema.parse(Object.fromEntries(form.entries()));

  const record = await db.user.findUniqueOrThrow({ where: { email } })
  const loggedIn = await bcrypt.compare(password, record.password)

  if (loggedIn) {
    const session = await getSession();
    session.update({
      userEmail: email,
      isAdmin: record.isAdmin,
    });
  }
}
export const loginAction = action(login)

export const logout = async () => {
  'use server'
  const session = await getSession();
  await session.clear();
}

export const getUserConnected = query(async () => {
  'use server'
  try {
    const session = await getSession()
    if (!session.data.userEmail) {
      return null
    }
    return {
      email: session.data.userEmail,
      isAdmin: session.data.isAdmin || false,
    }
  } catch {
    return null
  }
}, 'getUserConnected')