import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import useNews from '../hooks/useNews';

export const HomePage = () => {
    const { news, setNews, loading, error, addNews, removeNews, userNews } =
        useNews();

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main className="main-news">
            <div className="news-list">
                <NewsList
                    news={news} // Noticias generales
                    userNews={userNews} // Noticias del usuario
                    setNews={setNews}
                    addNews={addNews}
                    removeNews={removeNews}
                    isUserNews={false} // Indicar que no son noticias del usuario
                />
            </div>
        </main>
    );
};
