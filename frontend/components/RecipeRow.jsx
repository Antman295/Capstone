import { useState } from 'react';
import { deleteRecipe } from '../utilites/controller.mjs';
import { useNavigate } from 'react-router-dom';

function RecipeRow({ recipe, setRecipe, recipes }) {
    const nav = useNavigate()

    async function handleDelete(params) {
        let res = await deleteRecipe(recipe._id);

        if (res) {
            let copy = recipes.filter((el) => el._id !== recipe._id);
            setRecipes(copy);
        }        
    }

    function handleClick(e) {
        nav(`/updateRecipe/${recipe._id}`)
    }

    return (
        <tr>
            <td>{recipe._id}</td>
            <td>{recipe.dish}</td>
            <td>{recipe.difficulty}</td>
            <td>{recipe.time} minutes</td>
            <td>{recipe.ingredients.join(', ')}</td>
            <td>
                <button onClick={handleDelete}>Delete</button>
            </td>
            <td>
                <button onClick={handleClick}>Edit</button>
            </td>
        </tr>
    )
}

export default RecipeRow;