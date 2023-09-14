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
        //comprobar si tiene un dislike (0) dado por mi, si tiene un dislike lo borro y doy like
        // Comprobar si tiene un like dado por mi, si lo tine lo borro. sinó lo doy
        // actualizar la info de la noticia, para eso tengo que volver a recuperar todas las noticias y actualizar setNews

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
        } catch (error) {
            setError(error.message);
        }
    };
    const handleDislikeClick = async () => {
        //comprobar si tiene un like (1) dado por mi, si tiene un like lo borro y doy dislike
        // Comprobar si tiene un dislike dado por mi, si lo tine lo borro. sinó lo doy

        try {
            const response = await fetch(`${env}/news/${news.id}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ value: '2' }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el voto.');
            }
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
            <button>✏️</button>
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
