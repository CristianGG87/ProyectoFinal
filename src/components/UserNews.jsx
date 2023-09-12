import useNews from '../hooks/useNews';
import { ErrorMessage } from './ErrorMessage';
import { NewsList } from './NewsList';

export const UserNews = ({ id }) => {
    const { news, loading, error, removeNews } = useNews(id);
    console.log(news);
    console.log(id);
    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h2>Noticias publicadas por XXXXXX</h2>
            <NewsList news={news} removeNews={removeNews} />
        </section>
    );
};
