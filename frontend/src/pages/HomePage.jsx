import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
        <h1>Food Picker</h1>
        <nav>
            <Link to={'/recipes'}>Make Something At Home</Link> <br/>
            <Link to={'/eatOut'}>Go Out To Eat</Link>
        </nav>
        </>
    )
}