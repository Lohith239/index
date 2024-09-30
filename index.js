const foodContainer = document.getElementById('foodContainer'); 
const searchBtn = document.getElementById('searchBtn');

async function fetchRecipes(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayRecipes(data.meals);
}

function displayRecipes(recipes) {
    foodContainer.innerHTML = ''; 
    if (recipes) {
        recipes.forEach(recipe => {
            const foodDiv = document.createElement('div'); 
            foodDiv.classList.add('food'); 

            const ingredientsList = getIngredientsList(recipe);

            foodDiv.innerHTML = ` 
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p><strong>Food ID:</strong> ${recipe.idMeal}</p> <!-- Updated to Food ID -->
                <p><strong>Ingredients:</strong> ${ingredientsList}</p>
                <a href="${recipe.strSource}" target="_blank" class="viewFoodBtn">View Food</a> <!-- Updated to View Food -->
            `;

            foodContainer.appendChild(foodDiv); 
        });
    } else {
        foodContainer.innerHTML = '<p>No foods found. Please try another search.</p>'; 
    }
}

function getIngredientsList(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    return ingredients.join(', ');
}

searchBtn.addEventListener('click', () => {
    const query = document.getElementById('search').value;
    if (query) {
        fetchRecipes(query);
    }
});
