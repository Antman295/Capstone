import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import RecipeTable from '../components/RecipeTable';
import { getRecipes } from '../utilites/controller.mjs';
import '../styles/Recipes.css'

function Recipes() {
    const [list, setList] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [formData, setFormData] = useState({
        searchParams: '',
        onList: false,
    });

    // Used to add style to this page
    useEffect(() => {
        document.body.classList.add('recipes-page');
        return () => {
          document.body.classList.remove('recipes-page');
        };
      }, [])

    async function getData() {
        try {
        let res = await getRecipes();
        let sortedRecipes = res.sort((a, b) => a.meal_type.localeCompare(b.meal_type));
        setList(sortedRecipes);
    } catch (err) {
        console.error('Error fetching recipes: ', err);
    }
}

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (formData.searchParams || formData.onList) {
        const query = formData.searchParams.toLowerCase();
        const filtered = list.filter(recipe =>
            recipe.dish.toLowerCase().includes(query)
        );
        setFilteredRecipes(filtered);
    } else {
        setFilteredRecipes([]);
    }
    }, [formData.searchParams, list])

    return (
        <>
        <div className='recipes'>
            <h1>Make At Home</h1>

            <SearchBar 
                formData={formData} 
                setFormData={setFormData}
                recipes={list}  
                setFilteredRecipes={setFilteredRecipes}
                />

            {filteredRecipes.length > 0 ? (
                <RecipeTable
                    recipes = {filteredRecipes}
                    setList = {setList}
                />
            ) : (
                <div>
                <h2>Search for a recipe or click the checkbox to show all of them</h2>
                <h3>If this message still appears, the list might be empty or the recipe doesn't exist</h3>
                </div>
            )}
            
            <nav>
                <Link to={'/'}><button>Go Back</button></Link>
            </nav>
            </div>
        </>
    )
}

export default Recipes;