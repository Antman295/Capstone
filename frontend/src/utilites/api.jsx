export async function getRestaurants(name) {
    const url = 'https://fast-food-restaurants-usa-top-50-chains.p.rapidapi.com/restaurants-top/kfc/location/0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6a6e062b9emsh16b34a837e91457p1e0127jsnebf2d9722ccc',
		'x-rapidapi-host': 'fast-food-restaurants-usa-top-50-chains.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result = await response.json();
	console.log(result); // Process the JSON response here

	return result; // Optionally return the data for use elsewhere
} catch (error) {
	console.error('Error fetching data:', error);
}
}