import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center justify-between p-3 text-gray-200">
        <div class="flex">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Search</a>
          </li>
          <li class={`border-b-2 ${active("/recipes")} mx-1.5 sm:mx-6`}>
            <a href="/recipes">Recipes</a>
          </li>
        </div>
        <div class="flex space-x-4">
          <button class="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
          <button class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </ul>
    </nav>
  );
}