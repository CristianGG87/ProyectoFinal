import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import useNews from '../hooks/useNews';

export const HomePage = () => {
    const { news, loading, error } = useNews();

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Ultimas Noticias</h1>
            <NewsList news={news} />
        </section>
    );
};
