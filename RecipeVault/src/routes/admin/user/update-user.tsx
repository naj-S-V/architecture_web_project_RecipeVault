import { useSubmission } from "@solidjs/router";
import { updateUserAction } from "~/lib/user";

export default function UpdateUser() {
  const updatingUser = useSubmission(updateUserAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin - Update User
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={updateUserAction}
      >
        {/* Email de l'utilisateur à mettre à jour */}
        <input
          name="email"
          type="email"
          placeholder="Current User Email"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Nouvel email */}
        <input
          name="newEmail"
          type="email"
          placeholder="New Email (optional)"
          class="border bg-white p-2 rounded w-full"
        />

        {/* Nouveau mot de passe */}
        <input
          name="password"
          type="password"
          placeholder="New Password (optional)"
          class="border bg-white p-2 rounded w-full"
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
          class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded w-full"
        >
          Update User
        </button>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {updatingUser.pending && (
          <p class="text-blue-500">Updating user...</p>
        )}
        {updatingUser.error && (
          <p class="text-red-500">Error: {updatingUser.error.message}</p>
        )}
        {updatingUser.result && (
          <p class="text-green-500">User updated successfully!</p>
        )}
      </div>
    </main>
  );
}