const fileName = '../data/all-recipes.json';
let recipes = require(fileName);
const helper = require('../helpers/helper');

//Is awaiting one promise and then awaiting another promise a thing?
function getRecipes(){
  return new Promise((resolve, reject) => {
    if(recipes.length === 0){
      reject({
        message: 'No recipes available',
        status: 202
      })
    }
    resolve(recipes)
  })
}

function getTrendingRecipes(){
  return new Promise((resolve, reject) => {
    // resolve(recipes.recipes)
    if(recipes.recipes.length !== 0){
      const minTrendiness = 60.0
      const trending = recipes.recipes.filter(recipe => recipe.trending_rank >= minTrendiness)
      resolve(trending)
    } else {
      reject({
        message:'No recipes available',
        status: 202
      })

    }
  })
}

function getTopRatedRecipes(){
  return new Promise((resolve, reject) => {
    if(recipes.recipes.length !== 0){
      const minSocialRank = 60.0
      const topRated = recipes.recipes.filter(recipe => recipe.social_rank >= minSocialRank)
      resolve(topRated)
    } else {
      reject({
        message: 'No recipes available',
        status: 202
      })
    }
  })
}

function getRecipe(id) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(recipes.recipes, id)
    .then(recipe => resolve(recipe)) 
    .catch(err => reject(err))
  })
}

//Search by ingredient
/*
Ingredient Cat will find your ingredients.

 _._     _,-'""`-._
(,-.`._,'(       |\`-/|
    `-.-' \ )-`( , o o)         
          `-    \`_`"'-         <(ingredients)>

*/
function findRecipesWith(value, ingredientsRequired){
  return new Promise((resolve, reject) => {
    var matchedRecipes = [];
    const inputIngredients = value.split(","); 
    for (let recipe of recipes.recipes){
      recipe['missingIngredients'] = []
      recipeIngredientTracker = {
        'sendFlag': true
      }
      for (let inputIngredient of inputIngredients){
        recipeIngredientTracker[inputIngredient] = false 
      }
      for (let recipeIngredient of recipe.ingredients){
        for (let inputIngredient of inputIngredients)
          if(recipeIngredient.toLowerCase().includes(inputIngredient.toLowerCase())){
              recipeIngredientTracker[inputIngredient] = true
          }
        }
        if (ingredientsRequired){
          for (let ingredientTracker in recipeIngredientTracker){
            if (!recipeIngredientTracker[ingredientTracker]){
              recipeIngredientTracker['sendFlag'] = false
            }
          }
        } else { //recipes don't need all ingreidents
          for (let ingredientTracker in recipeIngredientTracker){
            if (recipeIngredientTracker[ingredientTracker]){
              //we only hit this if any ingredient is in recipe
              recipeIngredientTracker['sendFlag'] = true
              break;
            } else{
              recipeIngredientTracker['sendFlag'] = false
            }

          }
        }  
        if (recipeIngredientTracker['sendFlag']){
          for (let ingredientTracker in recipeIngredientTracker){
              if(ingredientTracker != 'sendFlag'){
                recipe['missingIngredients'].push(ingredientTracker)
              }      
        }
        matchedRecipes.push(recipe)
      }
      }
      if (matchedRecipes.length != 0){
        resolve(matchedRecipes)
      }else {
        reject("No Matches found")
      }

    })} 


// HOW THIS FUNCTION WORKS:
// - Takes a new recipe as a parameter
function insertRecipe (newRecipe){
  return new Promise((resolve, reject) => {
    // Generates a new id constant by calling getNewId and passing the .json to that function
    const id = { recipe_id: helper.getNewId(recipes) }
    // Creates a new date object based on the current date
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate()
    }
    // Appends a new recipe object to the end of the existing recipeOfTheDay array (from the .json file)
    newRecipe = { ...id, ...date, ...newRecipe }
    recipes.push(newRecipe)
    helper.writeJSONFile(fileName, recipes)
    resolve(newRecipe)
  })
}

// HOW THIS FUNCTION WORKS:
// - Takes an id and newRecipe as parameters
function updateRecipe(id, newRecipe){
  return new Promise((resolve, reject) => {
    // Checks to see if the param id is in the recipes(.json) array
    helper.mustBeInArray(recipes, id)
      .then(recipe => { // Then if it is in the array... 
        const index = recipes.findIndex(r => r.id == recipe.recipe_id) // find the index of the recipe object
        id = { recipe_id: recipe.recipe_id } // set the id to equal the recipe_id of the object
        const date = {
          createdAt: recipe.createdAt, // keep original recipe object's creation date
          updatedAt: helper.newDate() // change the updated date to the current date
        }
        recipes[index] = { ...id, ...date, ...newRecipe } // set the recipe object at that index to be the updated info
        helper.writeJSONFile(fileName, recipes) // write the newly updated recipe to the .json file
        resolve(recipes[index])
    })
    .catch(e => reject(e)) // If it isn't in the array then return an error
  })
}

function deleteRecipe(id) {
  return new Promise ((resolve, reject) => {
    //Check to see if there's a recipe with this id in the array
    helper.mustBeInArray(recipes, id)
    .then(() => { // .filter() creates a new array with all recipe objects that don't have that id
      recipes = recipes.filter(recipe => recipe.recipe_id !== id)
    })
    .catch(err => reject(err))
  })
}

module.exports = {
  getRecipes,
  getTrendingRecipes,
  getTopRatedRecipes,
  getRecipe,
  findRecipesWith,
  insertRecipe,
  updateRecipe,
  deleteRecipe
}