import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findOneRecipe, updateRecipe } from '../../utilites/controller.mjs';

function UpdateForm() {
    const nav = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        async function getData() {
            let data = await findOneRecipe(id);
            setFormData(data);  
        }

        getData();
    }, []);

    function handleClick(e) {
        nav('/recipes');
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleIngredients = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = { ...updatedIngredients[index], name: value };
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

        if (!formData.meal_type) {
            alert("Please don't leave the meal type empty when updating this dish.")
            return;
        }

        if (!formData.dish) {
            alert("Please don't leave the dish name empty when updating this dish.")
            return;
        }

        if (!formData.ingredients || formData.ingredients.some(ingredient => ingredient.name === "")) {
            alert("Please don't leave the ingredient name empty. If you want to delete the last one added, click on the delete button")
            return;
        }

        try {
            e.preventDefault();
            await updateRecipe(id, formData);
            nav('/recipes');
        } catch (err) {
            console.error(err);
        }
        
    }

    return (
        <>
        <h2> Update Recipe </h2>
        {formData ? (
            <form onSubmit={handleSubmit}>
                <label>
                    Meal Type:{' '}
                    <input
                        onChange={handleChange}
                        value={formData.meal_type}
                        type='text'
                        name='meal_type'
                        />
                </label>
                <label>
                    Dish:{' '}
                    <input
                        onChange={handleChange}
                        value={formData.dish}
                        type='text'
                        name='dish'
                        />
                </label>
                <label>
                    Difficulty: {' '}
                    <select
                        onChange={handleChange}
                        value={formData.difficulty}
                        name='difficulty'
                    >
                        <option value='Easy'>Easy</option>
                        <option value='Medium'>Medium</option>
                        <option value='Hard'>Hard</option>
                    </select>
                </label>
                <label>
                Time - in minutes:{' '}
                    <input
                        onChange={handleChange}
                        value={formData.time}
                        type='number'
                        name='time'
                        />
                </label>
                <p>Ingredients:</p>
                {formData.ingredients.map((ingredient, index) => (
            <label key = {index}>
                Ingredient {index + 1}: {' '}
                <input type = "text" value={ingredient.name} onChange={(e) => handleIngredients(index, e.target.value)}
                />
            </label>
            ))}
                <button type = "button" onClick={addIngredient}>Add Ingredient</button>
                <button type = "button" onClick={deleteIngredient}>Delete Ingredient</button>
                <button type = "submit">Update Recipe</button>
            </form>


        ) : (
            <h2>Waiting for response...</h2>
        )}
        <button onClick={handleClick}>Close Form</button>

        </>
        )
}

export default UpdateForm;