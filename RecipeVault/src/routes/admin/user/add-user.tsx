import { useSubmission } from "@solidjs/router";
import { addUserAction } from "~/lib/user";

export default function AddUser() {
  const addingUser = useSubmission(addUserAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin - Add User
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={addUserAction}
      >
        {/* Email de l'utilisateur */}
        <input
          name="email"
          type="email"
          placeholder="User Email"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Mot de passe */}
        <input
          name="password"
          type="password"
          placeholder="Password (min. 8 characters)"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Rôle administrateur */}
        <div class="flex items-center space-x-2">
          <input
            name="isAdmin"
            type="checkbox"
            id="isAdmin"
            class="w-5 h-5"
          />
          <label for="isAdmin" class="text-white">
            Is Admin
          </label>
        </div>

        {/* Bouton pour soumettre */}
        <button
          type="submit"
          class="bg-green-600 text-white p-2 rounded w-full"
        >
          Add User
        </button>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {addingUser.pending && (
          <p class="text-blue-500">Adding user...</p>
        )}
        {addingUser.error && (
          <p class="text-red-500">Error: {addingUser.error.message}</p>
        )}
        {addingUser.result && (
          <p class="text-green-500">User added successfully!</p>
        )}
      </div>
    </main>
  );
}