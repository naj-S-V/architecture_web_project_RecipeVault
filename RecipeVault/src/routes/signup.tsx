import { useSubmission } from "@solidjs/router";
import { registerAction } from "~/lib/user";

export default function Signup() {
  const registering = useSubmission(registerAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Sign up
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={registerAction}
      >
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Password (min. 8 characters)"
          class="border bg-white p-2 rounded w-full"
          required
        />


        {/* Bouton pour soumettre */}
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Create Account
        </button>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {registering.pending && (
          <p class="text-blue-500">Creating account...</p>
        )}
        {registering.error && (
          <p class="text-red-500">Error: {registering.error.message}</p>
        )}
        {registering.result && (
          <p class="text-green-500">Account created successfully!</p>
        )}
      </div>
    </main>
  );
}