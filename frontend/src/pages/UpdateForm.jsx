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
        updatedIngredients[index] = { ...updatedIngredients[index], name: value };
        setFormData({ ...formData, ingredients: updatedIngredients });
    }

    
    async function handleSubit(e) {
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
            <form onSubmit={handleSubit}>
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
                        type='checkbox'
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
                        type='text'
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
                <input type='submit' />
            </form>
        ) : (
            <h2>Waiting on you...</h2>
        )}
        <button onClick={handleClick}>Close Form</button>
        </>
    )
}

export default UpdateForm;