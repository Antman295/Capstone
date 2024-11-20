import { useState } from 'react';
import { createRecipe } from '../../utilites/controller.mjs';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        meal_type: '',
        dish: '',
        difficulty: "Easy",
        time: 0,
        ingredients: [{name: ""}],
    });

    function handleClick(e) {
        nav('/');
    }

    function handleChange(e) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }


    const handleIngredients = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = { name: value }; // Ensure ingredient is an object
        setFormData({ ...formData, ingredients: updatedIngredients });
    }

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, {name: ""}],
        })
    }

    const deleteIngredient = () => {
        if (formData.ingredients.length > 0) {
        setFormData({
            ...formData,
            ingredients: formData.ingredients.slice(0, -1),
        })
    }
    }

    async function dishExists(dish) {
        try {
        let res = await fetch('/recipes');

        const recipes = await res.json();
        return recipes.some(recipe => recipe.dish.toLowerCase() === dish.toLowerCase());
        } catch (err) {
            console.error(err)
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.meal_type) {
            alert("Please enter the meal type in the text field.")
            return;
        }

        if (!formData.dish) {
            alert("Please enter the dish name in the text field.")
            return;
        }

        const doesDishExists = await dishExists(formData.dish)

        if (doesDishExists) {
            alert('This dish is already on the list. Please enter a new one.')
            return;
        }

        if (!formData.ingredients) {
            alert("Please enter all ingredients you added. If you want to delete the last one added, click on the delete button")
            return;
        }

            try {
                await createRecipe(formData);
            nav('/recipes');
        } catch (err) {
            console.log('Error objects: ', err)
            console.error(err);
        }
    }

    return (
        <>
        <h2> Add A Recipe </h2>
        <form onSubmit={handleSubmit}>
            <label>
                Meal Type: <input onChange={handleChange} type='text' name='meal_type' />
            </label>
            <label>
                Dish: <input onChange={handleChange} type='text' name='dish' />
            </label>
            <label>
                Difficulty: {' '}
                <select onChange={handleChange} type='text' name='difficulty'>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                    </select>
            </label>
            <label>
                Time - in minutes: <input onChange={handleChange} type='number' name='time' />
            </label>
            <p>Ingrdients:</p>
            {formData.ingredients.map((ingredient, index) => (
            <label key = {index}>
                Ingredient {index + 1}: {' '}
                <input type = "text" value={ingredient.name} onChange={(e) => handleIngredients(index, e.target.value)}
                />
            </label>
            ))}
            <button type="button" onClick={addIngredient}>
                    Add Ingredient
                </button>
            <button type="button" onClick={deleteIngredient}>
                    Delete Ingredient
            </button>
            <button type="submit">Submit Recipe</button>
        </form>
        <button onClick={handleClick}>Close Form</button>
        </>
    )
}


export default CreateForm;