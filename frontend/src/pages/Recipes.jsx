import {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar';
import RecipeTable from '../../components/RecipeTable';
import { getRecipes } from '../../utilites/controller.mjs';

function Recipes() {
    const [list, setList] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [formData, setFormData] = useState({
        searchParams: '',
        onList: false,
    });

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
        <div>
            <h1>Make At Home</h1>
        </div>
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
                <h3>Add some recipes to the list if this message still appears as it might be empty</h3>
                </div>
            )}
        
        </>
    )
}

export default Recipes;