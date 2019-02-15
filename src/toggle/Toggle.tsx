import * as React from 'react';
import { Recipe } from '../recipes/Recipe';
import { RecipeElement } from '../recipes/RecipeElement';
import { sortRecipes } from './sortRecipes';
import '../layout/Toggle.css';

interface Props {
    recipes: Recipe[]
}

interface State {
    sortStatus: boolean
}

export class Toggle extends React.Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {sortStatus: false};
        this.onToggleClick = this.onToggleClick.bind(this);
    }

    onToggleClick() {
        //this is run when the button is clicked.
        this.setState((prevState) => ({
            sortStatus: !(prevState.sortStatus)
        }))                
    }

    //* Needs to be called from inside the .sort() to alphabetize the results
    sortRecipes(recipe1, recipe2){
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

    render() {
        const { recipes } = this.props;
        return (
            <React.Fragment>
                <button onClick={this.onToggleClick} className="sort-button">Sort A &rarr; Z</button>
                <hr />
                <div className="recipe-grid">
                    {/* Ternary Operator: booleanVariable ? true : false */}
                    {this.state.sortStatus ? 
                    (recipes.sort(sortRecipes).map(recipe => <RecipeElement key={recipe.recipe_id} recipe={recipe} />))
                    : 
                    (recipes.map(recipe => <RecipeElement key={recipe.recipe_id} recipe={recipe} />))
                    }

                </div>
            </React.Fragment>
        );
    }
}
