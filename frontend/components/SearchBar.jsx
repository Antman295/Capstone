import { Link } from 'react-router-dom';

function SearchBar({ formData, setFormData, showRecipes }) {
    function handleChange(e) {
        const { name, value } = e.target;

        if (name === 'searchParams') {
            const search = value.toLowerCase();
            setFormData({
                ...formData,
                [name]: value,
            });

            const filter = recipes.filter((recipe) =>
            recipe.dish.toLowerCase().includes(search));
            showRecipes(filter)
        }
    }

    function handleCheckbox(e) {
        const checked = e.target.checked;

        setFormData({
            ...formData,
            onList: checked,
        });

        if (checked) {
            setRecipes(recipes);
        }
    }

    return (
        <form>
            <input
                id='text'
                onChange={handleChange}
                name='searchParams'
                type='text'
                placeholder="Search for a recipe"
                value={formData.searchParams || ''}
                />

            <label>
                <input 
                    onChange={showRecipes} 
                    name='onList' 
                    type='checkbox'
                    checked={formData.onList || false}
                    />
                Show all recipes on your list.
            </label>
            <nav>
                <Link to={'/addRecipe'}>Add Recipe</Link>
            </nav>
        </form>
    )
}

export default SearchBar;