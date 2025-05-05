export async function getRecipes(ingredients: string) {
    // Simulation de réponse API
    return [
      { id: 1, title: "Pâtes à la tomate", ingredients: ["pâtes", "tomates", "basilic"] },
      { id: 2, title: "Salade composée", ingredients: ["laitue", "tomates", "thon"] }
    ];
  }
  