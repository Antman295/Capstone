import {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar';
import RecipeTable from '../../components/RecipeTable';
import { getRecipes } from '../../utilites/controller.mjs';

function Recipes() {
    const [list, setList] = useState(null);
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
        setFilteredRecipes(sortedRecipes);
    } catch (err) {
        console.error('Error fetching recipes: ', err);
    }
}

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const query = formData.searchParams.toLowerCase();
        const filtered = list.filter(recipe =>
            recipe.dish.toLowerCase().includes(query)
        );
        setFilteredRecipes(filtered);
    }, [formData.searchParams, list])

    return (
        <>
            <SearchBar 
                formData={formData} 
                setFormData={setFormData}  />

            {formData.onList && filteredRecipes.length > 0 ? (
                <RecipeTable
                    recipes = {filteredRecipes}
                    setList = {setList}
                />
            ) : (
                <h3>No recipes to show. Click "Show recipes on your list" or add some</h3>
            )}
        
        </>
    )
}

export default Recipes;