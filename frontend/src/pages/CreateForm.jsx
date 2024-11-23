import { useState, useEffect } from 'react';
import { createRecipe } from '../utilites/controller.mjs';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css'

function CreateForm() {
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        meal_type: '',
        dish: '',
        difficulty: "Easy",
        time: 0,
        ingredients: [{name: ""}],
    });

    const [warning, setWarning] = useState(false);

    // Used to add style to this page
    useEffect(() => {
        document.body.classList.add('forms');
        return () => {
            document.body.classList.remove('forms');
        };
        }, [])

    function handleClick(e) {
        if (warning) {
        nav('/recipes');
        } else {
            setWarning(true);
        }
    }

    function handleChange(e) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }


    const handleIngredients = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = { name: value };
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
        let res = await fetch('http://localhost:3000/api/recipes');
        const recipes = await res.json();
        console.log("Existing recipes:", recipes);
        // return true;
        return recipes.some(recipe => recipe.dish.toLowerCase() === dish.toLowerCase());
        } catch (err) {
            console.error('Error checking if dish exists: ', err)
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

        if (!formData.ingredients || formData.ingredients.some(ingredient => ingredient.name === "")) {
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
            </label> {" "}
            <label>
                Dish: <input onChange={handleChange} type='text' name='dish' />
            </label> {" "}
            <label>
                Difficulty: {' '}
                <select onChange={handleChange} type='text' name='difficulty'>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                    </select>
            </label> {" "}
            <label>
                Time - in minutes: <input onChange={handleChange} type='number' name='time' />
            </label>
            <h3>Ingredients:</h3>
            {formData.ingredients.map((ingredient, index) => (
            <label key = {index}>
                Ingredient {index + 1}: {' '}
                <input type = "text" value={ingredient.name} onChange={(e) => handleIngredients(index, e.target.value)}
                />
                <br/>
            </label>
            ))}
            <br/><button type="button" onClick={addIngredient}>
                    Add Ingredient
                </button> {" "}
            <button type="button" onClick={deleteIngredient}>
                    Delete Ingredient
            </button> <br/><br/>
            <button className = "submit" type="submit">Submit Recipe</button>
        </form> <br/>
        {warning ? (
            <>
                <span>Are you sure? All unsaved progress will be lost!</span> {" "}
                <button className = "delete" onClick={handleClick}>Yes</button> {" "}
                <button onClick={() => setWarning(false)}>No</button>
            </>
        ) : (
            <button className = "caution" onClick={handleClick}>Close Form</button>    
        )}
        
        </>
    )
}


export default CreateForm;