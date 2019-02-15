import * as React from 'react';
import { Recipe } from './Recipe';
import { Link } from 'react-router-dom';
import { decoder } from '../utils/decoder';
import '../layout/Toggle.css';

interface Props {
    recipe: Recipe
}

//* All this component is doing is returning an individual recipe by displaying the recipe title and image as a link
export const RecipeElement: React.FunctionComponent<Props> = props => {

    const { recipe } = props;
    const { title } = props.recipe;

    return(
        <div className="recipe-display">
            <Link to={`/recipe/${recipe.recipe_id}`} className="content-img">
                <img src={`${recipe.image_url}`} alt={decoder(title)} />
                <div id="recipe-title">{decoder(title)}</div>
            </Link>
        </div>
    );
}




