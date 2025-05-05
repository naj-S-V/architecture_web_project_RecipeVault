export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Que veux-tu cuisiner aujourd'hui ?</h1>
      <input type="text" placeholder="Ex: tomates, pâtes" className="border p-2 rounded w-full max-w-md mb-4" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Chercher des recettes</button>
    </main>
  );
}
