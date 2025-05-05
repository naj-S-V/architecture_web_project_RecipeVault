import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">

      <h1 class="max-6-xs text-6xl text-white font-thin uppercase my-16">
        What is in your fridge ?
      </h1>

      <div class="my-4">
        <input
          type="text"
          placeholder="Search for ingredients..."
          class="border bg-white p-2 rounded mr-2"
        />
        <button class="bg-sky-600 text-white p-2 rounded">Add</button>
      </div>


    </main>
  );
}
