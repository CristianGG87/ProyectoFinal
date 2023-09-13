import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';

export const OneNews = ({ news }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [likes, setLikes] = useState(news.vPositive);
    const [dislikes, setDislikes] = useState(news.vNegative);
    const env = import.meta.env.VITE_BACKEND;
    const { title, intro, text, photo, userName, date, id, userId } = news;

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`${env}/news/${news.id}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ value: '1' }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el voto.');
            }
            console.log('Incrementando likes');
            setLikes((prevLikes) => prevLikes + 1);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDislikeClick = async () => {
        try {
            const response = await fetch(`${env}/news/${news.id}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ value: '0' }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el voto.');
            }

            setDislikes(dislikes + 1);
        } catch (error) {
            setError(error.message);
        }
    };

    const { removeNews } = useNews();

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await removeNews(id, token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article>
            <h2>{title}</h2>
            <h3>{intro}</h3>
            <p>{text}</p>
            {photo ? <img src={`${env}/${photo}`} alt={title} /> : null}
            <section>
                <button onClick={handleLikeClick}>Like ({likes})</button>
                <button onClick={handleDislikeClick}>
                    Dislike ({dislikes})
                </button>
            </section>
            <p>
                Autor: {userName} el {new Date(date).toLocaleString()}
            </p>
            {user && user.user.id === userId ? (
                <section>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Se borrará la Noticia, ¿está seguro?'
                                )
                            )
                                handleDelete(id);
                        }}
                    >
                        Borrar noticia
                    </button>
                    {error && <p>{error}</p>}
                </section>
            ) : null}
        </article>
    );
};
