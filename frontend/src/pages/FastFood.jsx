import { useEffect } from 'react';
import { Link } from "react-router-dom"
import '../styles/FastFood.css'

export default function FastFood() {
    useEffect(() => {
        document.body.classList.add('fastfood');
        return () => {
            document.body.classList.remove('fastfood');
        };
        }, [])
    return (
        <div className = "menu">
        <h1>BE HEALTHY AND MAKE SOMETHING AT HOME</h1>
        <nav>
        <Link to={'/'}><button>Go Back</button></Link>
    </nav>
    </div>
    )
}