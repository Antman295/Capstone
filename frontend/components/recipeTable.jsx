import React from 'react';
import RecipeRow from './RecipeRow'
import RecipeMealRow from './RecipeMealRow';

function RecipeTable({ recipe, searchParams, onList, setRecipe}) {
    let rows = [];
    let meal = null;

    recipe.forEach((el, index) => {
        if (el.dish.toLowerCase().indexOf(searchParams.toLowerCase()) == -1) return;

        if (!el.exist && onList) return;

        if (meal !== el.meal_type) {
            meal = el.meal_type;
            rows.push(<RecipeMealRow key={`meal-${el.meal_type}-${index}`}meal_type={el.meal_type} />);
        }

        rows.push(<RecipeRow  key={el._id || `recipe-${index}`}recipes={recipe} setRecipe={setRecipe} recipe={el} />);
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