import {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar';
import RecipeTable from '../../components/RecipeTable';
import { getRecipes } from '../../utilites/controller.mjs';

function Recipes() {
    const [list, setList] = useState(null);
    const [formData, setFormData] = useState({
        searchParams: '',
        onList: true,
    });

    async function getData() {
        let res = await getRecipes();
        let newArr = res.sort((a, b) => a.meal_type.localeCompare(b.meal_type));
        setList(newArr);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <SearchBar formData={formData} setFormData={setFormData} />
            {formData.onList && list ? (
                <RecipeTable
                    searchParams = {formData.searchParams}
                    onList = {formData.onList}
                    recipe = {list}
                    setList = {setList}
                />
            ) : (
                <h3>No recipes to show. Click "Show recipes on your list" or add some</h3>
            )}
        
        </>
    )
}

export default Recipes;