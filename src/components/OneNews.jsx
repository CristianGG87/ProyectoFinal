import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteNewsService } from '../services';
import { useNavigate } from 'react-router-dom';

export const OneNews = ({ oneNews, removeNews }) => {
    console.log(removeNews);
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const deleteNews = async (id) => {
        try {
            await deleteNewsService({ id, token });
            removeNews(id);

            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article>
            <h2>{oneNews.title}</h2>
            <h3>{oneNews.intro}</h3>
            <p>{oneNews.text}</p>
            {oneNews.photo ? (
                <img
                    src={`http://localhost:8000/${oneNews.photo}`}
                    alt={oneNews.title}
                />
            ) : null}
            <p>
                Autor: {oneNews.userName} el{' '}
                {new Date(oneNews.date).toLocaleString()}
            </p>

            {user && user.user.id === oneNews.userId ? (
                <section>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Se borrara la Noticia, esta seguro?'
                                )
                            )
                                deleteNews(oneNews.id);
                        }}
                    >
                        Borrar noticia
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}
        </article>
    );
};
