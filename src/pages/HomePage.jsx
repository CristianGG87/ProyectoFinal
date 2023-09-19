import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import useNews from '../hooks/useNews';

export const HomePage = () => {
    const { news, setNews, loading, error, addNews, removeNews } = useNews();

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main className="main-news">
            <div className="news-list">
                <NewsList
                    news={news}
                    setNews={setNews}
                    addNews={addNews}
                    removeNews={removeNews}
                />
            </div>
        </main>
    );
};
