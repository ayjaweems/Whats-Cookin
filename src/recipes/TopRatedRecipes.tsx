import * as React from 'react';
import { Recipe } from './Recipe';
import { RecipeElement } from './RecipeElement';
import { Toggle } from '../toggle/Toggle';
import '../layout/Toggle.css';
import { RECIPE_API_URL } from '../index'
import { API_KEY1 } from '../index'; //250
import { API_KEY2 } from '../index'; //50

interface State {
    recipes: Recipe[],
}

interface Props {}

export class TopRatedRecipes extends React.Component<Props, State> {

    constructor(props) {
        super(props),
        this.state = { recipes: [] }
    }

    async componentDidMount() {
        try {
            //* Fetches an array of top rated recipes
            // const res = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY1}&sort=r`);
            const res = await fetch(`${RECIPE_API_URL}/top-rated-recipes`);
            const body = await res.json();
            this.setState({recipes: body});
        } catch(e){
            console.log(e);
        }
    }

  render() {
    const {recipes} = this.state;
    if(!recipes) return null;
    return (
      <div className="top">
        <h1>Top Rated Recipes</h1>
        <hr />
        <div className="recipe-grid">
          {recipes.map(recipe => <RecipeElement key={recipe.recipe_id} recipe={recipe} />)}
          {/* <Toggle recipes={recipes} /> */}
        </div>
      </div>
    );
  }
}
