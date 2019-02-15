import * as React from 'react';
import { Recipe } from './Recipe';
import { API_KEY1 } from '../index';
import { API_KEY2 } from '../index';
import '../layout/Homepage.css';

interface Props {}

interface State {
    recipe: Recipe
}

const max = 100000;

export class RecipeOfTheDay extends React.Component <Props, State> {


    constructor(props) {
        super(props);
        this.state = { recipe: null };
    }
    
    async componentDidMount() {
        
        try {
            let id = this.chooseRecipe();
            var res = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY1}&rId=${id}`);
            var recipe = await res.json();
            //While the recipe id does not return a valid recipe object or the id returns a recipe that stores an empty array, make the API call again
            while(Array.isArray(recipe.recipe))
            {
                id = this.chooseRecipe();
                res = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY1}&rId=${id}`);
                recipe = await res.json();
                console.log("cats",recipe);
            }
            //Else, set the state to be that recipe
            this.setState({
                recipe: recipe.recipe,
            });
        } catch(e) {
            console.log(e);
        }
    }
  
    //Generate a random recipe of the day by id
    public chooseRecipe() {
        let id = Math.floor(Math.random() * Math.floor(max));
        return id;
    }

    render() {
        const { recipe } = this.state;
        if(!recipe) return null;
        return (
        <div id="daily-recipe-display">
            <h3 id="ROD-title">Today's Recipe of the Day is...</h3>
            <h1>{recipe.title}</h1>
            <img src={recipe.image_url} alt="Recipe of the Day" />
        </div>
        )
    }
}
