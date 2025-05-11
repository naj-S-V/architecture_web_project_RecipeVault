import { useSubmission, RouteDefinition, createAsyncStore } from "@solidjs/router";
import { getUsers, removeUserAction } from "~/lib/user";

export const route = {
    preload() {
        getUsers();
    },
} satisfies RouteDefinition;

export default function RemoveUser() {
    const removingUser = useSubmission(removeUserAction);
    const users = createAsyncStore(() => getUsers(), {
        initialValue: [],
    });

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
                Admin - Remove User
            </h1>

            <form
                class="my-4 space-y-4"
                method="post"
                action={removeUserAction}
            >
                <div class="flex space-x-4">
                    {/* Champ pour saisir l'email de l'utilisateur */}
                    <input
                        type="email"
                        name="email"
                        placeholder="User Email"
                        class="border bg-white p-2 rounded flex-1"
                        required
                    />

                    {/* Bouton pour soumettre */}
                    <button
                        type="submit"
                        class="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Remove User
                    </button>
                </div>
            </form>

            {/* Affichage de l'état de soumission */}
            <div class="mt-4">
                {removingUser.pending && (
                    <p class="text-blue-500">Removing user...</p>
                )}
                {removingUser.error && (
                    <p class="text-red-500">Error: {removingUser.error.message}</p>
                )}
                {removingUser.result && (
                    <p class="text-green-500">User removed successfully!</p>
                )}
            </div>

            {/* Liste des utilisateurs */}
            <section class="mt-8">
                <h2 class="text-lg font-semibold text-white mb-4">
                    Current Users :
                </h2>
                <div class="bg-gray-800 p-4 rounded">
                    <ul class="text-white space-y-2">
                        {users().map((user) => (
                            <li class="border-b border-gray-600 pb-2">
                                <p>Email: {user.email}</p>
                                <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}