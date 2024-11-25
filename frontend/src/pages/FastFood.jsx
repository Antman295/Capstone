import React, { useState, useEffect } from 'react';
import { searchMenuItems } from '../utilites/api';
import { Link } from "react-router-dom";
import '../styles/FastFood.css';

export default function FastFood() {
    const [searchInput, setSearchInput] = useState(''); // User input for city/food search
    const [restaurantData, setRestaurantData] = useState([]); // API response data
    const [searchCity, setSearchCity] = useState(''); // Tracks the city being searched
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        // Add custom class to body for styling
        document.body.classList.add('fastfood');
        return () => {
            document.body.classList.remove('fastfood');
        };
    }, []);

    const fetchData = async (city) => {
        setLoading(true); // Show loading spinner
        try {
            const data = await searchMenuItems(city); // Call API function
            console.log(data); // Log API response for debugging

            // Adjust response handling based on API structure
            if (data && data.restaurants) {
                setRestaurantData(data.restaurants);
            } else if (data && data.menuItems) {
                setRestaurantData(data.menuItems);
            } else {
                setRestaurantData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setRestaurantData([]);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    const handleSearch = () => {
        if (searchInput.trim()) {
            setSearchCity(searchInput); // Save the search term
            fetchData(searchInput); // Fetch data for the entered city
        } else {
            alert('Please enter a valid city name.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="menu">
            <h1>Restaurant Search</h1>
            
            {/* Input Field for City Name */}
            <div>
                <input
                    type="text"
                    placeholder="Enter a city or food name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                {restaurantData.length > 0 ? (
                    restaurantData.map((restaurant, index) => (
                        <div key={index} className="restaurant">
                            <h2>{restaurant.name || 'Unnamed Restaurant'}</h2>
                            <p>{restaurant.description || 'No description available'}</p>
                            {restaurant.image && (
                                <img src={restaurant.image} alt={restaurant.name} />
                            )}
                            {restaurant.menu && (
                                <ul>
                                    {restaurant.menu.map((item, idx) => (
                                        <li key={idx}>
                                            {item.name} - {item.price || 'N/A'}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No restaurants found for "{searchCity}"</p>
                )}
            </div>

            {/* Navigation */}
            <nav>
                <Link to={'/'}>
                    <button>Go Back</button>
                </Link>
            </nav>
        </div>
    );
}