import { Link } from 'react-router-dom';
import '../styles/HomePage.css'


export default function HomePage() {
    return (
        <div className="homepage">
            <h1>Food Picker</h1>
                <nav>
                    <Link to={'/recipes'}><button>Make Something At Home</button></Link> <br/><br/>
                    <Link to={'/eatOut'}><button>Go Out To Eat</button></Link>
                </nav>
        </div>
    )
}