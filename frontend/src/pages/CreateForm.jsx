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

    async function handleSubmit(e) {
            e.preventDefault();
            try {
            await createRecipe(formData);
            nav('/recipes');
        } catch (err) {
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