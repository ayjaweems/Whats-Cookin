import * as React from 'react';
import { Recipe } from './Recipe';
import { Toggle } from '../toggle/Toggle';
import '../layout/Toggle.css';
import { RECIPE_API_URL } from '../index';
import { API_KEY1 } from '../index';
import { API_KEY2 } from '../index';

export const initialState = {
    sortStatus: false,
}

interface State {
    recipes: Recipe[], //will hold an array of recipe objects
}

interface Props {}

export class AllRecipes extends React.Component<Props, State>  {

    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    async componentDidMount(){
        try
        {
            //* Fetches an array of all recipes
            const res = await fetch(`${RECIPE_API_URL}/all-recipes`);
            const body = await res.json()
            this.setState({ recipes: body.recipes})
        } catch(e) {
            console.log(e);
        }
    }

    // //!This is a clue for how to implement the search bar
    // //TODO Explanation:
    // public scramble = () => {
    //     let state = {...this.state}; //- Creates a new state object that will add on to the already existing state
    //     state.recipes.map(recipe => recipe.social_rank = Math.random() * 100); //Randomizes the social ranks so that we can work with them
    //     state.recipes.sort((a,b) => a.social_rank - b.social_rank); //sorts the recipes by their social ranks
    //     this.setState({recipes: state.recipes}); //sets the state to be an additional sorted array of recipes based on social rank
    // }

    render() {
        const { recipes } = this.state;
        if(!recipes) return null;
        return (
            <div className="top">
                <h1 className="page-title">All Recipes</h1>
                {/* <button onClick={this.scramble}>Scramble</button> */}
                <Toggle recipes={recipes}/>
            </div>
        );
    }

}
