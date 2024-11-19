import {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar';
import RecipeTable from '../../components/RecipeTable';

function Recipes() {
    const [list, setList] = useState(null);
    const [formData, setFormData] = useState({
        searchParams: '',
        onList: false,
    });

    async function getData() {
        let res = await getList();
        let newArr = res.sort((a, b) => a.category.localeCompare(b.category));
        setList(newArr);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <SearchBar formData={formData} setFormData={setFormData} />
            {list ? (
                <RecipeTable
                    searchParams = {formData.searchParams}
                    onList = {formData.onList}
                    recipe = {list}
                    setList = {setList}
                />
            ) : (
                <h3>Waiting for a response...</h3>
            )}
        
        </>
    )
}

export default Recipes;