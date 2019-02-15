import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRouter} from './common/AppRouter';
import * as serviceWorker from './serviceWorker';

//Right now I'm only trying to call the api from the AllRecipes page just to test it
//It's still logging an empty object...
//Can you click over to the index.js link in the RecipeAPI folder?
//You have a server running for the api right? change the ip that the server is running on to the 10.5.5.132 ip instead of localhost.
export const RECIPE_API_URL = "http://10.5.5.132:3001/api/v1/recipes"; //the api I created
export const API_KEY1 = "ae92096b9e5410ab526aaa82f6042f45"; //250 api calls per day
export const API_KEY2 = "e8bd99920c5b8aee1a7feab166f44a45"; //50 api calls per day

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
