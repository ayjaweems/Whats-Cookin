import * as React from 'react';
import { Recipe } from './Recipe';
import '../layout/searchPage.css';
import { RecipeElement } from './RecipeElement';
import '../layout/Toggle.css';
import { RECIPE_API_URL } from '../index'
import { API_KEY1 } from '../index';
import { API_KEY2 } from '../index';

interface Props {}

interface State {
  recipes: Recipe[],
  ingredients: string
}

export class SearchRecipes extends React.Component <Props, State> {

  constructor(props){
    super(props);
    this.state = { recipes: [], ingredients: ""};
  }

  public async findRecipes(input: string, status: boolean){
    try {
      const ingredients = input;
      // const res = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY1}&q=${ingredients}`);
      const res = await fetch(`${RECIPE_API_URL}/ingredients&q=${ingredients}/&allIngredientsRequired=${status}`);
      const recipes = await res.json();
      
      this.setState({
        recipes: recipes.recipes,
        ingredients: input
      });

      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  }

  public handleOnClick = (e): void => {
    e.preventDefault();
    const ingredients = (document.getElementById("ingredients") as HTMLInputElement).value;
    this.findRecipes(ingredients);
  }

  public handleKeyEvent = (e): void => {
    let button = document.getElementById("submit");
    
    if(e.key === "Enter"){
      button.onclick;
    }
  }

  render() {
    const { recipes } = this.state;
    const { ingredients } = this.state;
    if(!recipes){
      return(
        <p>Please enter ingredients to search by...</p>
      )
    };
    return (
      <div id="search">
      <br />
        <input type="text" id="ingredients" placeholder="Search by ingredient(s)..." /><button type="submit" id="submit" onClick={(e) => {this.handleOnClick(e)}}>Search</button>
        <div className="recipe-grid">
          {recipes.map(recipe => <RecipeElement key={recipe.recipe_id} recipe={recipe} />)}
        </div>
      </div>
    )
  }
}
