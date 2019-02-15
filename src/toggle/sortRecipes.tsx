import { Recipe } from '../recipes/Recipe';

export function sortRecipes(recipe1, recipe2) {
    const recipeTitle1 = recipe1.title.toUpperCase();
    const recipeTitle2 = recipe2.title.toUpperCase();

    let comparison = 0;
    if(recipeTitle1 > recipeTitle2){
        comparison = 1;
    }
    else if(recipeTitle2 > recipeTitle1){
        comparison = -1;
    }

    return comparison;
}