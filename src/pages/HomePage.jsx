import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import useNews from '../hooks/useNews';
import { AuthContext } from '../context/AuthContext';
import { CreateNews } from '../components/CreateNews';

export const HomePage = () => {
    const { news, loading, error, addNews } = useNews();
    const { user } = useContext(AuthContext);

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Ultimas Noticias</h1>
            {user ? <CreateNews addNews={addNews} /> : null}

            <NewsList news={news} />
        </section>
    );
};
