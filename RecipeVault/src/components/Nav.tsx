import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center justify-between p-3 text-gray-200">
        {/* Navigation principale */}
        <div class="flex items-center space-x-4">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Search</a>
          </li>
          <li class={`border-b-2 ${active("/recipes")} mx-1.5 sm:mx-6`}>
            <a href="/recipes">Recipes</a>
          </li>
          <li class={`border-b-2 ${active("/admin/add-recipe")} mx-1.5 sm:mx-6`}>
            <a href="/admin/add-recipe">Add recipe</a>
          </li>
          <li class={`border-b-2 ${active("/admin/remove-recipe")} mx-1.5 sm:mx-6`}>
            <a href="/admin/remove-recipe">Remove recipe</a>
          </li>
        </div>

        {/* Boutons Sign In et Sign Up */}
        <div class="flex items-center space-x-4">
          <li>
            <a
              href="/signin"
              class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </a>
          </li>
          <li>
            <a
              href="/signup"
              class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}