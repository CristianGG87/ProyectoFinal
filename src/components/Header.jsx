import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import './Header.css';
import SearchBar from './SearchBar';

export const Header = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (keyword) => {
        // Realiza la solicitud al backend con el valor de keyword
        fetch(`http://localhost:8000/news?keyword=${keyword}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data); // Actualiza el estado con los resultados de la búsqueda
                console.log('DATA:', data);
            })
            .catch((error) => {
                console.error('Error al buscar noticias:', error);
            });
    };

    return (
        <header>
            <Link to="/">
                <img className="logo" src="logo.gif" alt="logo" />
            </Link>
            <nav className="login">
                <Auth />
            </nav>
            <SearchBar onSearch={handleSearch} />
            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Resultados de la búsqueda:</h3>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <a href={result.url}>{result.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};
