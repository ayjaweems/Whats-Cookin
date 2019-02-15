import * as React from 'react';
const silverwareIcon = require('../images/silverwareIcon.svg');
const homeIcon = require('../images/home-icon.png');
const allRecipesIcon = require('../images/all-recipes-icon.png');
const trendingRecipesIcon = require('../images/trending-icon.png');
const topRatedRecipesIcon = require('../images/top-rated-icon.png');
const searchRecipesIcon = require('../images/search-icon.png');
import '../layout/NavigationBar.css';
import { Link } from 'react-router-dom';

export const Header: React.FunctionComponent <{}> = () => {
    return (
        <div>
            {/* App Header */}
            <header className="App-header">
                <Link to="/" className="logo-link">
                    <img src={silverwareIcon} className="App-logo" alt="logo"/>
                </Link>
                <h1>What's Cookin'?</h1>
            </header>

            {/* Navigation Bar */}
            <div className="nav-bar">
                <ul id="list">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link"><img src={homeIcon} className="nav-icon" alt="logo" />Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/all-recipes" className="nav-link"><img src={allRecipesIcon} className="nav-icon" alt="logo" />All Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trending-recipes" className="nav-link"><img src={trendingRecipesIcon} className="nav-icon" alt="logo" />Trending Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/top-rated-recipes" className="nav-link"><img src={topRatedRecipesIcon} className="nav-icon" alt="logo" />Top Rated Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search-recipes" className="nav-link"><img src={searchRecipesIcon} className="nav-icon" alt="logo" />Find A Recipe</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}