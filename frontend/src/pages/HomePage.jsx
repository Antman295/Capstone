import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <nav>
            <Link to={'/addRecipe'}>Add Recipe</Link>
        </nav>
    )
}