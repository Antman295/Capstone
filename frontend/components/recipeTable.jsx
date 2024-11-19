import React from 'react';
import RecipeRow from './RecipeRow'

function recipeTable({ recipe, searchParams, exist, setRecipe}) {
    let rows = [];
    let meal = null;

    recipe.forEach((el) => {
        if (el.name.toLowerCase().indexOf(searchParams.toLowerCase()) == -1) return;

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
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default recipeTable;