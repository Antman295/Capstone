import React from 'react';
import RecipeRow from './RecipeRow'
import RecipeMealRow from './RecipeMealRow';

function RecipeTable({ recipe, searchParams, onList, setList}) {
    let rows = [];
    let meal = null;

    recipe.forEach((el, index) => {
        if (el.dish.toLowerCase().indexOf(searchParams.toLowerCase()) == -1) return;

        if (!el.exist && onList) return;

        if (meal !== el.meal_type) {
            meal = el.meal_type;
            rows.push(<RecipeMealRow key={`meal-${el.meal_type}-${index}`}meal_type={el.meal_type} />);
        }

        rows.push(<RecipeRow  key={el._id || `recipe-${index}`} recipes={recipe} setRecipe={setList} recipe={el} />);
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
            <tbody>{recipe.length > 0 && recipe.map((el) => (
                    <RecipeRow key={el._id} recipe={el} setRecipe={setList} recipes={recipe} />
                ))}
                </tbody>
        </table>
    )
}

export default RecipeTable;