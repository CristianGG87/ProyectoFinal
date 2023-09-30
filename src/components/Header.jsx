import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import SearchBar from './SearchBar';
import './Header.css';

export const Header = ({ showAllNews, keywordNews }) => {
    const [altTop, setAtTop] = useState(true);
    const renderSearchBar =
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/login' &&
        !window.location.pathname.startsWith('/news/');

    useEffect(() => {
        const handler = () =>
            setAtTop(document.scrollingElement.scrollTop === 0);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header id="header" className={altTop ? 'top' : 'not-top'}>
            <Link to="/" className="header-link" onClick={showAllNews}>
                <div className="logo-container">
                    <img
                        src="../public/news_128x128-32_22252.ico"
                        className="logo"
                        alt="Logo"
                    />
                    <h1> Hack a Boss News</h1>
                </div>
            </Link>

            {renderSearchBar && <SearchBar keywordNews={keywordNews} />}
            <nav className="login">
                <Auth />
            </nav>
        </header>
    );
};
export default Header;
