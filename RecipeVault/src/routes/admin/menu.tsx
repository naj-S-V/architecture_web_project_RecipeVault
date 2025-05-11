import { useNavigate } from "@solidjs/router";

export default function AdminMenu() {
  const navigate = useNavigate();

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        Admin Menu
      </h1>

      {/* Section pour gérer les recettes */}
      <h2 class="text-lg font-semibold text-white">
        Choose an action to manage <u>recipes</u>:
      </h2>
      <div class="flex justify-center space-x-4 mt-8">
        {/* Bouton pour aller à Add Recipe */}
        <button
          class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded mx-4"
          onClick={() => navigate("/admin/add-recipe")}
        >
          Add Recipe
        </button>

        {/* Bouton pour aller à Remove Recipe */}
        <button
          class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded mx-4"
          onClick={() => navigate("/admin/remove-recipe")}
        >
          Remove Recipe
        </button>

        {/* Bouton pour aller à Update Recipe */}
        <button
          class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/update-recipe")}
        >
          Update Recipe
        </button>

        {/* Bouton pour aller à View Recipes */}
        <button
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/recipes")}
        >
          View Recipes
        </button>
      </div>

      {/* Section pour gérer les utilisateurs */}
      <h2 class="text-lg font-semibold text-white my-8">
        Choose an action to manage <u>users</u>:
      </h2>
      <div class="flex place-items-center justify-center space-x-4 mt-8">
        {/* Bouton pour aller à Add User */}
        <button
          class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded mx-4"
          onClick={() => navigate("/admin/user/add-user")}
        >
          Add User
        </button>

        {/* Bouton pour aller à Remove User */}
        <button
          class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded mx-4"
          onClick={() => navigate("/admin/user/remove-user")}
        >
          Remove User
        </button>

        {/* Bouton pour aller à Update User */}
        <button
          class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/user/update-user")}
        >
          Update User
        </button>

        {/* Bouton pour aller à View Users */}
        <button
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/user/view-users")}
        >
          View Users
        </button>
      </div>
    </main>
  );
}