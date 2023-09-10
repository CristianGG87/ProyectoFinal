import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import useNews from '../hooks/useNews';
import { AuthContext } from '../context/AuthContext';
import { CreateNews } from '../components/CreateNews';

export const HomePage = () => {
    const { news, loading, error, addNews, removeNews } = useNews();
    const { user } = useContext(AuthContext);

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            {user ? <CreateNews addNews={addNews} /> : null}

            <h1>Ultimas Noticias</h1>

            <NewsList news={news} removeNews={removeNews} />

        </section>
    );
};
