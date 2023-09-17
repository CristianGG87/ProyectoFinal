import { useEffect, useState } from 'react';
import NavBar from './Navbar';
import { News } from './News';
import './NewsList.css';

export const NewsList = ({ news, setNews, removeNews }) => {
    const [filteredNews, setFilteredNews] = useState([]);
    const [showAllNews, setShowAllNews] = useState(true);
    const [sortByVotes, setSortByVotes] = useState(false);

    const handleSortByVotes = () => {
        const sortedNews = [...news.news].sort(
            (a, b) => b.vPositive - a.vPositive
        );
        setFilteredNews(sortedNews);
        setSortByVotes(true);
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
    };

    const handleShowAllNews = () => {
        console.log("Botón 'Volver a la página principal' clickeado");
        // Mostrar todas las noticias nuevamente al hacer clic en "Volver a la página principal".
        setFilteredNews([]);
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

    let newsToDisplay = [...news.news]; // Mostrar todas las noticias

    if (showAllNews && sortByVotes) {
        // Ordenar por votos positivos si showAllNews y sortByVotes son true
        newsToDisplay.sort((a, b) => b.vPositive - a.vPositive);
    } else if (showAllNews) {
        // Ordenar por fecha si solo showAllNews es true y sortByVotes es false
        newsToDisplay.sort((a, b) => new Date(b.date) - new Date(a.date));
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
            </section>
            <section className="news-list">
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

                        <button onClick={handleShowAllNews}>
                            Volver a la página principal
                        </button>
                    </>
                )}
            </section>
        </main>
    );
};
