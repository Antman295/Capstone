import { Link } from "react-router-dom"
import '../styles/FastFood.css'

export default function FastFood() {
    return (
        <div class = "fastfood">
        <h1>BE HEALTHY AND MAKE SOMETHING AT HOME</h1>
        <nav>
        <Link to={'/'}><button>Go Back</button></Link>
    </nav>
    </div>
    )
}