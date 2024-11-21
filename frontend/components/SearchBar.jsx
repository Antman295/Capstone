import { Link } from 'react-router-dom';

function SearchBar({ formData, setFormData, recipes, setFilteredRecipes }) {
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'searchParams') {
            const search = value.toLowerCase();
            const filter = recipes.filter((recipe) =>
            recipe.dish.toLowerCase().includes(search)
        );
            setFilteredRecipes(filter)
        }
    }

    function handleCheckbox(e) {
        const checked = e.target.checked;
        setFormData({...formData, onList: checked})

        if (checked) {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes([]);
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
                    onChange={handleCheckbox} 
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