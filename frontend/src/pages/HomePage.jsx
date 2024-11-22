import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
        <h1>Food Picker</h1>
        <nav>
            <Link to={'/recipes'}><button>Make Something At Home</button></Link> <br/><br/>
            <Link to={'/eatOut'}><button>Go Out To Eat</button></Link>
        </nav>
        </>
    )
}