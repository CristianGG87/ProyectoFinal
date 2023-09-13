import { Link } from 'react-router-dom';
import { Auth } from './Auth';

export const Header = () => {
    return (
        <header>
            <h1 className="header-title">
                <Link to="/">Noticias Colaborativas</Link>
            </h1>
            <nav>
                <Auth />
            </nav>
        </header>
    );
};
