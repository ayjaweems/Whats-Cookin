import * as React from 'react';

export interface Recipe {
    title: string,
    recipe_id: string,
    ingredients: string[],
    image_url: string,
    publisher: string,
    social_rank: number,
    source_url: string
}