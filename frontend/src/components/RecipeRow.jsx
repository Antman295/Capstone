import { useState } from 'react';
import { deleteRecipe } from '../utilites/controller.mjs';
import { useNavigate } from 'react-router-dom';

function RecipeRow({ recipe, setRecipe, recipes }) {
    const nav = useNavigate()
    const [warning, setWarning] = useState(false);

    async function handleDelete(params) {
        let res = await deleteRecipe(recipe._id);

        if (res) {
            let copy = recipes.filter((el) => el._id !== recipe._id);
            setRecipe(copy);
        }  
        
        setWarning(false);
    }

    function handleClick(e) {
        nav(`/updateRecipe/${recipe._id}`)
    }

    const ingredients = recipe.ingredients.map((ingredient) => ingredient.name).join(', ')
    return (
        <tr>
            <td>{recipe.meal_type}</td>
            <td>{recipe.dish}</td>
            <td>{recipe.difficulty}</td>
            <td>{recipe.time} minutes</td>
            <td>{ingredients}</td>
            <td>
            {warning ? (
                    <>
                        <span>Confirm delete? This can't be undone</span> {" "}
                        <button class = "delete" onClick={handleDelete}>Yes</button> {" "}
                        <button onClick={() => setWarning(false)}>No</button>
                    </>
                ) : (
                    <button class = "caution" onClick={() => setWarning(true)}>Delete</button>
                )}
            </td>
            <td>
                <button onClick={handleClick}>Edit</button>
            </td>
        </tr>
    )
}

export default RecipeRow;