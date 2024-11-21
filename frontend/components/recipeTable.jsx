import React from 'react';
import RecipeRow from './RecipeRow'

function RecipeTable({ recipes, setList}) {

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
            <tbody>{ recipes.map((el) => (
                    <RecipeRow 
                        key={el._id} 
                        recipe={el} 
                        setRecipe={setList} 
                        recipes={recipes} />
                ))}
                </tbody>
        </table>
    )
}

export default RecipeTable;