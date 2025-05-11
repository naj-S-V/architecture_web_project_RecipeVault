import { useSubmission } from "@solidjs/router";
import { loginAction } from "~/lib/user";

export default function SignIn() {
  const loggingIn = useSubmission(loginAction);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Sign In
      </h1>

      <form
        class="my-4 space-y-4"
        method="post"
        action={loginAction}
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
          placeholder="Password"
          class="border bg-white p-2 rounded w-full"
          required
        />

        {/* Bouton pour soumettre */}
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Sign In
        </button>
      </form>

      {/* Affichage de l'état de soumission */}
      <div class="mt-4">
        {loggingIn.pending && (
          <p class="text-blue-500">Signing in...</p>
        )}
        {loggingIn.error && (
          <p class="text-red-500">Error: {loggingIn.error.message}</p>
        )}
        {loggingIn.result && (
          <p class="text-green-500">Signed in successfully!</p>
        )}
      </div>
    </main>
  );
}