import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import './Header.css';

export const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>NOTICIAS COLABORATIVAS</h1>
            </Link>
            <nav className="login">
                <Auth />
            </nav>
        </header>
    );
};
