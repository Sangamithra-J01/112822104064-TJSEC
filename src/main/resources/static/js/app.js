const API_URL = 'http://localhost:8080/api/recipes';
let editingRecipeId = null;

// Load all recipes when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
    setupFormListener();
});

// Setup form submission listener
function setupFormListener() {
    const form = document.getElementById('recipeForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveRecipe();
    });
}

// Load all recipes
async function loadRecipes() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to load recipes');
        
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error loading recipes:', error);
        showNotification('Error loading recipes. Please try again.', 'error');
        displayEmptyState();
    }
}

// Display recipes in the grid
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    
    if (recipes.length === 0) {
        displayEmptyState();
        return;
    }
    
    recipeList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <h3>${escapeHtml(recipe.name)}</h3>
            <div class="recipe-info">
                ${recipe.category ? `<span class="recipe-badge">${escapeHtml(recipe.category)}</span>` : ''}
                ${recipe.servings ? `<span class="recipe-badge">👥 ${recipe.servings} servings</span>` : ''}
                ${recipe.prepTime ? `<span class="recipe-badge">⏱️ Prep: ${recipe.prepTime}min</span>` : ''}
                ${recipe.cookTime ? `<span class="recipe-badge">🔥 Cook: ${recipe.cookTime}min</span>` : ''}
            </div>
            <div class="recipe-details">
                <h4>Ingredients:</h4>
                <p>${escapeHtml(recipe.ingredients)}</p>
            </div>
            <div class="recipe-details">
                <h4>Instructions:</h4>
                <p>${escapeHtml(recipe.instructions)}</p>
            </div>
            <div class="recipe-actions">
                <button class="btn btn-edit" onclick="editRecipe(${recipe.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Show loading state
function showLoading() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '<div class="loading">Loading recipes...</div>';
}

// Show empty state
function displayEmptyState() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = `
        <div class="empty-state">
            <p>No recipes found</p>
            <p style="font-size: 0.9em;">Add your first recipe using the form on the left!</p>
        </div>
    `;
}

// Save recipe (create or update)
async function saveRecipe() {
    const form = document.getElementById('recipeForm');
    const recipeId = document.getElementById('recipeId').value;
    
    const recipe = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value || null,
        servings: document.getElementById('servings').value ? parseInt(document.getElementById('servings').value) : null,
        prepTime: document.getElementById('prepTime').value ? parseInt(document.getElementById('prepTime').value) : null,
        cookTime: document.getElementById('cookTime').value ? parseInt(document.getElementById('cookTime').value) : null,
        ingredients: document.getElementById('ingredients').value,
        instructions: document.getElementById('instructions').value
    };
    
    try {
        let response;
        if (recipeId) {
            // Update existing recipe
            response = await fetch(`${API_URL}/${recipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe)
            });
        } else {
            // Create new recipe
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe)
            });
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save recipe');
        }
        
        showNotification(recipeId ? 'Recipe updated successfully!' : 'Recipe added successfully!', 'success');
        resetForm();
        loadRecipes();
    } catch (error) {
        console.error('Error saving recipe:', error);
        showNotification(error.message || 'Error saving recipe. Please check your input.', 'error');
    }
}

// Edit recipe
async function editRecipe(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to load recipe');
        
        const recipe = await response.json();
        
        document.getElementById('recipeId').value = recipe.id;
        document.getElementById('name').value = recipe.name;
        document.getElementById('category').value = recipe.category || '';
        document.getElementById('servings').value = recipe.servings || '';
        document.getElementById('prepTime').value = recipe.prepTime || '';
        document.getElementById('cookTime').value = recipe.cookTime || '';
        document.getElementById('ingredients').value = recipe.ingredients;
        document.getElementById('instructions').value = recipe.instructions;
        
        document.getElementById('form-title').textContent = 'Edit Recipe';
        document.getElementById('submitBtn').textContent = 'Update Recipe';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading recipe:', error);
        showNotification('Error loading recipe for editing', 'error');
    }
}

// Delete recipe
async function deleteRecipe(id) {
    if (!confirm('Are you sure you want to delete this recipe?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete recipe');
        
        showNotification('Recipe deleted successfully!', 'success');
        loadRecipes();
    } catch (error) {
        console.error('Error deleting recipe:', error);
        showNotification('Error deleting recipe', 'error');
    }
}

// Search recipes
async function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        loadRecipes();
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('Failed to search recipes');
        
        const recipes = await response.json();
        displayRecipes(recipes);
        
        if (recipes.length === 0) {
            showNotification('No recipes found matching your search', 'error');
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
        showNotification('Error searching recipes', 'error');
        displayEmptyState();
    }
}

// Reset form
function resetForm() {
    document.getElementById('recipeForm').reset();
    document.getElementById('recipeId').value = '';
    document.getElementById('form-title').textContent = 'Add New Recipe';
    document.getElementById('submitBtn').textContent = 'Add Recipe';
    editingRecipeId = null;
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Allow Enter key in search
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});
