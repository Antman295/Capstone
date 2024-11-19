import { Link } from 'react-router-dom';

function SearchBar({ formData, setFormData }) {
    function handleChange(e) {
        if (e.target.name == 'onList') {
            setFormData({...formData, onList: !formData.onList})
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
                dish='searchParams'
                type='text'
                placeholder="Search for a recipe"
                />

            <label>
                <input onChange={handleChange} name='onList' type='checkbox' />
                Show recipes on your list.
            </label>
            <nav>
            <Link to={'/addRecipe'}>Add Recipe</Link>
            </nav>
        </form>
    )
}

export default SearchBar;