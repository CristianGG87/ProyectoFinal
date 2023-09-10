import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteNewsService } from '../services';
import { Link, useNavigate } from 'react-router-dom';

export const OneNews = ({ news, removeNews }) => {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const deleteNews = async (id) => {
        try {
            await deleteNewsService({ id, token });
            removeNews(id);
            navigate('/');
            console.log(removeNews);
        } catch (error) {
            setError(error.message);
        }
    };
    console.log(news.userId);
    console.log(user.user.id);
    return (
        <article>
            <h2>{news.title}</h2>
            <h3>{news.intro}</h3>
            <p>{news.text}</p>
            {news.photo ? (
                <img
                    src={`http://localhost:8000/${news.photo}`}
                    alt={news.title}
                />
            ) : null}
            <p>
                Autor: {news.userName} el {new Date(news.date).toLocaleString()}
            </p>
            <Link to={'/'}>
            {user && user.user.id === news.userId ? (
                <section>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Se borrara la Noticia, esta seguro?'
                                )
                            )
                                deleteNews(news.id);
                        }}
                    >
                        Borrar noticia
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}
            </Link>
        </article>
    );
};
