import * as React from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { App } from './App';
import { AllRecipes } from '../recipes/AllRecipes';
import { TrendingRecipes } from '../recipes/TrendingRecipes';
import { TopRatedRecipes } from '../recipes/TopRatedRecipes';
import { RecipeDetails } from '../recipes/RecipeDetails';
import { SearchRecipes } from '../recipes/SearchRecipes';
import { RecipeOfTheDay } from '../recipes/RecipeOfTheDay';

export const AppRouter: React.FunctionComponent<{}> = () => {
    return(
        <Router>
            <React.Fragment>
                <Route component={App} />
                <Switch>
                    <Route exact path="/" component={RecipeOfTheDay} />
                    <Route exact path="/home" component={RecipeOfTheDay} />
                    <Route exact path="/all-recipes" component={AllRecipes} />
                    <Route exact path="/trending-recipes" component={TrendingRecipes} />
                    <Route exact path="/top-rated-recipes" component={TopRatedRecipes} />
                    <Route exact path="/search-recipes" component={SearchRecipes} />
                    <Route path="/recipe/:id" component={RecipeDetails} />
                </Switch>
            </React.Fragment>
        </Router>
    )
}