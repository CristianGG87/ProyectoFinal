import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';

import { AuthContext } from '../context/AuthContext';
import { CreateNews } from '../components/CreateNews';
import useNews from '../hooks/useNews';

export const HomePage = () => {
    const { news, setNews, loading, error, addNews, removeNews } = useNews();
    const { user } = useContext(AuthContext);

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            {user ? <CreateNews addNews={addNews} /> : null}

            <h1>Ultimas Noticias</h1>

            <NewsList news={news} setNews={setNews} removeNews={removeNews} />
        </section>
    );
};
