const express = require('express')
const router = express.Router()
const recipe = require('../models/recipe.model')

//I'm trying to work out the search function

//Routes
module.exports = router

//All recipes
router.get('/all-recipes', async(req, res) => {
    await recipe.getRecipes()
    .then(recipes => res.json(recipes))
    .catch(err => {
        if(err.status) {
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({message: err.message})
        }
    })
})

//Trending recipes
router.get('/trending-recipes', async(req, res) => {
    await recipe.getTrendingRecipes()
    .then(recipes => res.json(recipes))
    .catch(err => {
        if(err.status){
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({message: err.message})
        }
    })
})

//Top Rated Recipes
router.get('/top-rated-recipes', async(req, res) => {
    await recipe.getTopRatedRecipes()
    .then(recipes => res.json(recipes))
    .catch(err => {
        if(err.status){
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({message: err.message})
        }
    })
})

//Search recipes
//I searched chocolate, banana and my status was true, but all of the recipes it's returning don't include both ingredients.
//does it have a missing ingredients prop in it at least?
//Well now i'm not getting any recipes and it's saying that it can't read .push() of undefined
//thats an easy fix, done
//It does have missing ingredients! But I don't think it's just returning recipes with one of those ingredients. I'm getting all 40 recipes returned and it's adding both chocolate and banana to missing ingredients if it doesn't have it
//okay thats good tiem to fix da problemo
//http://10.5.5.132:3001/api/v1/recipes/ingredients&q=chocolate,%20banana&allIngredientsRequired= 
router.get('/ingredients&q=:ingredients&allIngredientsRequired=:status', async(req, res) => {
    const ingredients = req.params.ingredients 
    //we can set either false or true as default value.
    //Aren't we setting the default to be false as of right now?
    //Or are you saying that I would have to set that in my app instead, associating the boolean required with the state of the checkbox?
    //It's more of a double check to make sure there actually is a value, incase someone or something messes up and passes nothing. You should set it up to send false in your app.
    //Okay so the route http://10.5.5.132:3001/api/v1/recipes/ingredients&q=chocolate,%20banana&allIngredientsRequired= shouldn't technically be a thing ever, but in case somehow it is, we're gonna set it to false anyway.
    //But the checkbox should always have some boolean status associated with it?
    //yes
    //Okay, time to hook this up to my app
    if (req.params.status === undefined) required = false;
    var required = req.params.status

    if(required = undefined){ required = false}

    await recipe.findRecipesWith(ingredients, required) 
    .then(recipe => res.json(recipe))
    .catch(err => {
        if(err.status){
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({ message: err.message})
        }
    })
})

//Recipe by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await recipe.getRecipe(id)
    .then(recipe => res.json(recipe))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


//it's thinking that the all-recipes&q=:ingrediants is the id, might have to look into how express works in parsing routes.
//I'm looking at the express documentation now and the only router middleware it explains is :id
//If I set the route to be /all-recipes&q=:id, and set the id to be ingredients instead do you think that could work?
//I think you need to reorder your routes from complex to not complex - top to bottom
//Which routes are complex?
//I think just long to short is good
//This should go before the recipebyid above it.
//Why does the placement matter if the routes are different?
//the routes are run in order from top to bottom, when it gets a url, it'll read /ingrediants&q= as an id.
//Ohh, I get what you're saying. Got it

//Insert a new recipe
router.post('/', async (req, res) => {
    await recipe.insertRecipe(req.body)
    .then(recipe => res.status(201).json({
        message: `The recipe #${recipe.recipe_id} has been created`,
        content: recipe
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

//Update a recipe
router.put('/:id', async (req, res) => {
    const id = req.params.recipe_id
    await recipe.updateRecipe(id, req.body)
    .then(recipe => res.json({
        message: `The recipe #${id} has been updated`,
        content: recipe
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

//Delete a recipe
router.delete('/:id', async (req, res) => {
    const id = req.params.recipe_id
    
    await recipe.deleteRecipe(id)
    .then(recipe => res.json({
        message: `The recipe #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})