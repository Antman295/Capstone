import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <nav>
            <Link to={'/recipes'}>Make Something At Home</Link>
        </nav>
    )
}