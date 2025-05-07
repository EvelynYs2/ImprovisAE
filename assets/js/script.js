async function findRecipe() {
  const ingredientsInput = document.getElementById("ingredients").value;
  const ingredients = ingredientsInput
    .split(",")
    .map(i => i.trim().toLowerCase())
    .join(",");

  const apiKey = "b7e5ac69930a41988ce92e962be2ec13";
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const recipes = await response.json();

    const recipeContainer = document.getElementById("recipe-results");
    recipeContainer.innerHTML = "";

    if (recipes.length === 0) {
      recipeContainer.innerHTML = "<p>Nenhuma receita encontrada.</p>";
      return;
    }

    for (const recipe of recipes) {
      const detailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const detailsRes = await fetch(detailsUrl);
      const details = await detailsRes.json();

      recipeContainer.innerHTML += `
        <div class="recipe">
          <h2>${details.title}</h2>
          <img src="${details.image}" alt="${details.title}" width="200" />
          <p><strong>Ingredientes:</strong> ${details.extendedIngredients.map(i => i.original).join(", ")}</p>
          <p><strong>Instruções:</strong> ${details.instructions || "Ver receita completa no link abaixo."}</p>
          <a href="${details.sourceUrl}" target="_blank">Ver receita completa</a>
        </div>
      `;
    }

  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("recipe-results").innerHTML = "<p>Erro ao buscar receitas. Verifique sua API Key.</p>";
  }
}
