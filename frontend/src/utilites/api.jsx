export async function searchMenuItems(query) {
    const apiKey = '6b2628a2641a433dbf7604801ccbfd50'
    const url = `https://api.spoonacular.com/food/menuItems/search?query=${query}&number=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log('Spoonacular API Response:', result);
        return result;
    } catch (error) {
        console.error('Error fetching data from Spoonacular:', error);
        return null;
    }
}