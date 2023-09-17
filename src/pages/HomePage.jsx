import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import { AuthContext } from '../context/AuthContext';
import useNews from '../hooks/useNews';

export const HomePage = () => {
    const { news, setNews, loading, error, addNews, removeNews } = useNews();
    const { user } = useContext(AuthContext);

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="news-container">
            <div className="news-list">
            {user ? <NewsList news={news} setNews={setNews} addNews={addNews} removeNews={removeNews} />: null}
            </div>
        </div>
    );
};
