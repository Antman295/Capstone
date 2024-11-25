import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../utilites/api';
import { Link } from "react-router-dom"
import '../styles/FastFood.css'

export default function FastFood() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.classList.add('fastfood');
        return () => {
            document.body.classList.remove('fastfood');
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRestaurants('kfc');  // Or dynamically pass the restaurant name
                console.log(data);  // Log to check if it's an array
                setRestaurantData(data.restaurants || data); // Adjust based on API response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="menu">
            <h1>Restaurant Menu</h1>
            <div>
                {restaurantData.map((restaurant, index) => (
                    <div key={index}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                        <ul>
                            {restaurant.menu.map((item, idx) => (
                                <li key={idx}>{item.name} - {item.price}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <nav>
                <Link to={'/'}><button>Go Back</button></Link>
            </nav>
        </div>
    );
}