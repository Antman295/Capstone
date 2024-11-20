import { Link } from 'react-router-dom';

function SearchBar({ formData, setFormData }) {
    function handleChange(e) {
        if (e.target.name == 'onList') {
            setFormData({...formData, onList: e.target.checked})
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
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
                />

            <label>
                <input 
                    onChange={handleChange} 
                    name='onList' 
                    type='checkbox'
                    checked={formData.onList}
                    />
                Show recipes on your list.
            </label>
            <nav>
                <Link to={'/addRecipe'}>Add Recipe</Link>
            </nav>
        </form>
    )
}

export default SearchBar;