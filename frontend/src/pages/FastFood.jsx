import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../utilites/api';
import { Link } from "react-router-dom";
import '../styles/FastFood.css';

export default function FastFood() {
    const [searchInput, setSearchInput] = useState('');
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        // Add custom class to body for styling
        document.body.classList.add('fastfood');
        return () => {
            document.body.classList.remove('fastfood');
        };
    }, []);

    const fetchData = async (query) => {
        setLoading(true);
        try {
            const data = await getRestaurants(query); // Call API function
            console.log('API Response:', data); // Log API response for debugging

            // Adjust response handling based on API structure
            if (data && data.menuItems) { // Ensure API response has 'restaurants'
                setRestaurantData(data.menuItems);
            } else {
                setRestaurantData([]); // Fallback for empty or unexpected response
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setRestaurantData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchInput.trim()) {
            fetchData(searchInput); // Fetch data for the entered query
        } else {
            alert('Please enter a valid food item.');
        }
    };

    if (loading) {
        return <div className="loading"><h2>Loading...</h2></div>;
    }

    return (
        <div className="menu">
            <h1>Restaurant Search</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a food item"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <br/><br /><button onClick={handleSearch}>Search</button>
            </div>

            <div>
                {restaurantData.length > 0 ? (
                    restaurantData.map((item, index) => (
                        <div key={index}>
                            <h3>{item.title || 'Unnamed Restaurant'}</h3>
                            {item.image && (
                                <img src={item.image} alt={item.title || 'Restaurant'} />
                            )}
                            <h2>{item.restaurantChain || 'No description available.'}</h2>
                        </div>
                    ))
                ) : (
                    <p>No restaurants with the item: "{searchInput}"</p>
                )}
            </div>

            <nav>
                <Link to={'/'}>
                    <button>Go Back</button>
                </Link>
            </nav>
        </div>
    );
}