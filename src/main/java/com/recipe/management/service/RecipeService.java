package com.recipe.management.service;

import com.recipe.management.exception.ResourceNotFoundException;
import com.recipe.management.model.Recipe;
import com.recipe.management.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    
    private final RecipeRepository recipeRepository;
    
    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
    
    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));
    }
    
    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }
    
    public Recipe updateRecipe(Long id, Recipe recipeDetails) {
        Recipe recipe = getRecipeById(id);
        
        recipe.setName(recipeDetails.getName());
        recipe.setIngredients(recipeDetails.getIngredients());
        recipe.setInstructions(recipeDetails.getInstructions());
        recipe.setPrepTime(recipeDetails.getPrepTime());
        recipe.setCookTime(recipeDetails.getCookTime());
        recipe.setServings(recipeDetails.getServings());
        recipe.setCategory(recipeDetails.getCategory());
        
        return recipeRepository.save(recipe);
    }
    
    public void deleteRecipe(Long id) {
        Recipe recipe = getRecipeById(id);
        recipeRepository.delete(recipe);
    }
    
    public List<Recipe> searchRecipesByName(String name) {
        return recipeRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Recipe> getRecipesByCategory(String category) {
        return recipeRepository.findByCategory(category);
    }
}
