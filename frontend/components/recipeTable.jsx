import React from 'react';
import RecipeRow from './RecipeRow'

function RecipeTable({ recipe, searchParams, onList, setRecipe}) {
    let rows = [];
    let meal = null;

    recipe.forEach((el) => {
        if (el.dish.toLowerCase().indexOf(searchParams.toLowerCase()) == -1) return;

        if (!el.exist && onList) return;

        if (meal !== el.meal) {
            meal = el.meal;
            rows.push();
        }

        rows.push(<RecipeRow recipes={recipe} setRecipe={setRecipe} recipe={el} />);
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Meal Type</th>
                    <th>Dish</th>
                    <th>Difficulty</th>
                    <th>Time</th>
                    <th>Ingredients</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default RecipeTable;