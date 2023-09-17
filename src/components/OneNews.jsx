import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';

export const OneNews = ({ news }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
    const env = import.meta.env.VITE_BACKEND;
    const { title, intro, text, photo, userName, date, id, userId, topic } =
        news;

    const sendVoteToBackend = async (value) => {
        try {
            const response = await fetch(`${env}/news/${news.id}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ value }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el voto.');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            setLikes(responseData.data.vPos);
            setDislikes(responseData.data.vNeg);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLikeClick = () => {
        // Envía un voto de "like" (valor 1) al backend y actualiza el recuento local.
        sendVoteToBackend('1');
        console.log('votos:', news.vPositive);
    };

    const handleDislikeClick = () => {
        // Envía un voto de "dislike" (valor 2) al backend y actualiza el recuento local.
        sendVoteToBackend('2');
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
            <h2>
                {title}
                <button>✏️</button>
            </h2>

            <h3>{intro}</h3>
            <p>{text}</p>
            {photo ? <img src={`${env}/${photo}`} alt={title} /> : null}
            <p>Tema: {topic}</p>
            <section>
                <button onClick={handleLikeClick}>👍({likes})</button>
                <button onClick={handleDislikeClick}>👎 ({dislikes})</button>
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
/////////////////////////////////////////////////////
