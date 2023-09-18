import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import './Header.css';

export const Header = () => {
    return (
        <header>
            <Link to="/">
                <img className="logo" src="logo.gif" alt="logo" />
            </Link>
            <nav className="login">
                <Auth />
            </nav>
        </header>
    );
};
