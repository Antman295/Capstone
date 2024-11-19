import { useState } from 'react';
import { createRecipe } from '../../utilites/controller.mjs';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        meal_type: '',
        dish: '',
        difficulty: '',
        time: 0,
        ingredients: ['', '', '', '']
    });

    function handleClick(e) {
        nav('/');
    }

    function handleChange(e) {
        if (e.target.name == 'stocked') {
            setFormData({
                ...formData,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleIngredients = (index, value) => {
        setFormData((prev) => {
            const newIngredient = [...prev.ingredients];
            newIngredient[index] = value;
            return {
                ...prev,
                ingredients: newIngredient,
            }
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            let res = await createRecipe(formData);
            nav('/');
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
            <label key = {index}>
                Ingredient {index + 1}: {' '}
                <input type = "text" value={ingredient} onChange={(e) => handleIngredients(index, e.target.value)}
                />
            </label>
            <input type = 'submit' />
        </form>
        <button onClick={handleClick}>Close Form</button>
        </>
    )
}

export default CreateForm;