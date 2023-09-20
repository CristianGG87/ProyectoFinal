import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import './Header.css';

export const Header = () => {
    const [altTop, setAtTop] = useState(true)

    useEffect(() => {
        const handler = () => setAtTop(document.scrollingElement.scrollTop ===0)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

       return (
        <header id='header' className={altTop ? 'top' : 'not-top'}>

            <Link to="/" className="header-link">
                <div className="logo-container">
                    <img src='../public/news_128x128-32_22252.ico' className="logo" alt="Logo" />
                    <h1> Hack a Boss News</h1>
                </div>
            </Link>

            <nav className="login">
                <Auth />
            </nav>

        </header>
    );
};