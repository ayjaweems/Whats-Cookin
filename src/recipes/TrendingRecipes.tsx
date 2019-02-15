import * as React from 'react';
import { Recipe } from './Recipe';
import { RecipeElement } from './RecipeElement';
import '../layout/Toggle.css';
import { RECIPE_API_URL } from '../index';
import { API_KEY1 } from '../index';
import { API_KEY2 } from '../index';

interface State {
    recipes: Recipe[]
}

interface Props {}

export class TrendingRecipes extends React.Component<Props, State>  {

    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    async componentDidMount(){
        try
        {
            //* Fetches an array of trending recipes
            //api key: ae92096b9e5410ab526aaa82f6042f45
            // const res = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY1}&sort=t`);
            const res = await fetch(`${RECIPE_API_URL}/trending-recipes`);
            console.log(res);
            const body = await res.json();
            // console.log(body);
            this.setState({recipes: body});
            // console.log(this.state.recipes);
        } catch(e) {
            console.log(e);
        }
    }
    
    render() {
        return (
            <div className="top">
                <h1 className="page-title">Trending Recipes</h1>
                <hr></hr>
                <div className="recipe-grid">
                    {this.state.recipes.map(recipe => <RecipeElement key={recipe.recipe_id} recipe={recipe} />)}
                </div>
            </div>
        );
    }
}
