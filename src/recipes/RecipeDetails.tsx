import * as React from 'react';
import { Recipe } from './Recipe';
import { decoder } from '../utils/decoder';
import '../layout/Toggle.css';

interface Props {
    match: {
        params: {
            id: string
        }
    }
}

interface State {
    recipe: Recipe
}

export class RecipeDetails extends React.Component <Props, State> {

    constructor(props) {
        super(props);
        this.state = { 
            recipe: null            
         };
    }

    async componentDidMount(){
        try{
            const res = await fetch(`https://www.food2fork.com/api/get?key=ae92096b9e5410ab526aaa82f6042f45&rId=${this.props.match.params.id}`);
            const recipe = await res.json();
            this.setState({
                recipe: recipe.recipe
            })
        } catch(e) {
            console.log(e);
        }
    }

    render(){ 
        const {recipe} = this.state;
        console.log(this.props)
        if(!recipe) {
        return(
            <React.Fragment>
                <p>Invalid</p>
            </React.Fragment>
        )
        } else {
        return(
            <div className="top">
                <h1>{decoder(recipe.title)}</h1>
                <img src={recipe.image_url}></img>
                <p><b>Ingredients:</b></p>
                <div id="ingredients-list">
                    {recipe.ingredients.map((ingredient, index) => 
                        <li key={index}>{decoder(ingredient)}</li>
                    )
                    }
                </div>
                <p>Interested in making this recipe? Please visit <a href={recipe.source_url}>{recipe.source_url}</a> for instructions.</p>
            </div>
        )}    
    }
}

