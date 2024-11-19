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
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}