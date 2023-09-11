import { useParams } from 'react-router-dom';
import useOneNews from '../hooks/useOneNews';
import { OneNews } from '../components/OneNews';
import { ErrorMessage } from '../components/ErrorMessage';

export const NewsPage = () => {
    const { id } = useParams();

    const { oneNews, loading, error } = useOneNews(id);

    if (loading) return <p>Cargando noticia...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <OneNews oneNews={oneNews} />
        </section>
    );
};
