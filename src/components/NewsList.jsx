import { useEffect, useState, useContext } from 'react';
import NavBar from './Navbar';
import { News } from './News';
import './NewsList.css';
import Acordeon from './Acordeon';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

export const NewsList = ({ news, setNews, removeNews, addNews }) => {
    const [filteredNews, setFilteredNews] = useState([]);
    const [showAllNews, setShowAllNews] = useState(true);
    const [sortByVotes, setSortByVotes] = useState(false);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token, user } = useContext(AuthContext);
    const [searchResults, setSearchResults] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const data = new FormData(e.target);

            addNews(data, token);
            e.target.reset();
            setImage(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };

    const handleSearch = (keyword) => {
        fetch(`http://localhost:8000/news?keyword=${keyword}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data.data.news);
                setSearchKeyword('');
            })
            .catch((error) => {
                console.error('Error al buscar noticias:', error);
            });
    };

    const handleSortByVotes = () => {
        const sortedNews = [...news.news].sort(
            (a, b) => b.vPositive - a.vPositive
        );
        setFilteredNews(sortedNews);
        setSortByVotes(true);
        setSearchResults([]);
    };

    const handleTopicClick = (topic) => {
        // Filtra las noticias según el tema seleccionado.
        const filteredNews = news.news.filter(
            (newsItem) => newsItem.topic === topic
        );
        // Actualiza el estado de NewsList con las noticias filtradas.
        setFilteredNews(filteredNews);
        // Cambia el estado para indicar que se están mostrando noticias filtradas.
        setShowAllNews(false);
        setSearchResults([]);
    };

    const handleShowAllNews = () => {
        // Mostrar todas las noticias nuevamente al hacer clic en "Volver a la página principal".
        setFilteredNews([]);
        // Restablecer los resultados de búsqueda a un array vacío
        setSearchResults([]);
        // Limpiar el valor del campo de búsqueda
        setSearchKeyword('');
        // Cambia el estado para indicar que se están mostrando todas las noticias.
        setShowAllNews(true);
        // Establecer sortByVotes a false cuando vuelves a mostrar todas las noticias
        setSortByVotes(false);
    };
    useEffect(() => {
        if (showAllNews) {
            // Establecer sortByVotes a false cuando se muestran todas las noticias
            setSortByVotes(false);
        }
    }, [showAllNews]);

    let newsToDisplay = [];

    if (searchResults.length > 0) {
        // Si hay resultados de búsqueda, mostrar solo esos resultados
        newsToDisplay = searchResults;
    } else if (showAllNews && sortByVotes) {
        // Ordenar por votos positivos si showAllNews y sortByVotes son true
        newsToDisplay = [...news.news].sort(
            (a, b) => b.vPositive - a.vPositive
        );
    } else if (showAllNews) {
        // Ordenar por fecha si solo showAllNews es true y sortByVotes es false
        newsToDisplay = [...news.news].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    } else {
        // Mostrar noticias filtradas por tema sin orden específico
        newsToDisplay = filteredNews;
    }
    return (
        <main className="news-container">
            <section className="nav-bar">
                <NavBar
                    onTopicClick={handleTopicClick}
                    onShowAllNews={handleShowAllNews}
                    onSortByVotes={handleSortByVotes}
                />
                <SearchBar onSearch={handleSearch} value={searchKeyword} />
            </section>

            <section className="news-list">
                {user ? (
                    <Acordeon>
                        <form onSubmit={handleForm}>
                            <fieldset>
                                <label htmlFor="title">
                                    Titulo de la notica{' '}
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="intro">Resumen noticia </label>
                                <input
                                    type="text"
                                    id="intro"
                                    name="intro"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="topic">
                                    Tema de la noticia{' '}
                                </label>
                                <select id="topic" name="topic">
                                    <option value="ciencia">Ciencia</option>
                                    <option value="deportes">Deportes</option>
                                    <option value="cultura">Cultura</option>
                                    <option value="politica">Politica</option>
                                    <option value="actualidad">
                                        Actualidad
                                    </option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="text">Text </label>
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="photo">Foto (opcional)</label>
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                                {image ? (
                                    <figure>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Preview"
                                            style={{ width: '100px' }}
                                        />
                                    </figure>
                                ) : null}
                            </fieldset>
                            <div className="button-container"></div>
                            <button className='publicar'>Publicar noticia</button>
                            {sending ? <p>Publicando noticia</p> : null}
                            {error ? <p>{error}</p> : null}
                        </form>
                    </Acordeon>
                ) : null}

                {/* Renderizar las noticias */}
                {newsToDisplay.length > 0 ? (
                    <ul>
                        {newsToDisplay.map((newsItem) => (
                            <li key={newsItem.id} className="news-item">
                                <News
                                    news={newsItem}
                                    setNews={setNews}
                                    removeNews={removeNews}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <p>
                            {showAllNews
                                ? 'No hay noticias.'
                                : 'No hay noticias para este tema.'}
                        </p>
                    </>
                )}
            </section>
        </main>
    );
};
