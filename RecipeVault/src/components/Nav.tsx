import { useLocation } from "@solidjs/router";
import { logout } from "../lib/user";
import { createSignal, onMount, Show } from "solid-js";
import { getUserConnected } from "../lib/user";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [isAdmin, setIsAdmin] = createSignal(false);

  onMount(async () => {
    const user = await getUserConnected();
    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);
    }
  });

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center justify-between p-3 text-gray-200">
        <div class="flex items-center space-x-4">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Search</a>
          </li>
          <li class={`border-b-2 ${active("/recipes")} mx-1.5 sm:mx-6`}>
            <a href="/recipes">Recipes</a>
          </li>
          <Show when={isAdmin()}>
            <li class={`border-b-2 ${active("/admin/menu")} mx-1.5 sm:mx-6`}>
              <a href="/admin/menu">Menu admin</a>
            </li>
          </Show>
        </div>
        <div class="flex items-center space-x-4">
          <Show when={isLoggedIn()} fallback={
            <>
              <li>
                <a href="/signin" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/signup" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
                  Sign Up
                </a>
              </li>
            </>
          }>
            <li>
              <button
                onClick={async () => {
                  await logout();
                  setIsLoggedIn(false);
                  setIsAdmin(false);
                }}
                class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </Show>
        </div>
      </ul>
    </nav>
  );
}