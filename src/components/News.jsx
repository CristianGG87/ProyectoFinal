import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './News.css';

export const News = ({ news, removeNews }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
    const env = import.meta.env.VITE_BACKEND;

    const sendVoteToBackend = async (value) => {
        try {
            console.log('Sending vote with value:', value);
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

            // Parsea la respuesta para obtener el nuevo recuento de votos.
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            // Actualiza los estados locales con el nuevo recuento de votos.
            setLikes(responseData.data.vPos);
            console.log('importante', responseData.data.vPos);
            setDislikes(responseData.data.vNeg);
            console.log('Likes:', likes); // Agregar logs para verificar los valores de likes y dislikes después de la actualización.
            console.log('Dislikes:', dislikes);
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

    const deleteNews = async (id) => {
        try {
            await removeNews(id, token);
        } catch (error) {
            setError(error.message);
        }
    };
    const fechaNoticia = new Date(news.date);
    const fechaActual = new Date();
    const diferenciaEnMS = fechaActual - fechaNoticia;
    const segundos = Math.floor(diferenciaEnMS / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    let fechaTexto;
    if (dias > 0) {
        fechaTexto = `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else if (horas > 0) {
        fechaTexto = `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (minutos > 0) {
        fechaTexto = `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else {
        fechaTexto = `Hace unos segundos`;
    }

    return (
        <article>
            <Link to={`/news/${news.id}`}>
                <h2>{news.title}</h2>
            </Link>
            <h3>{news.intro}</h3>
            <Link to={`/news/${news.id}`}>
                {news.photo ? (
                    <img src={`${env}/${news.photo}`} alt={news.title} />
                ) : null}
            </Link>
            <p className="topic">Tema: {news.topic}</p>
            <section className="likes">
                <button onClick={handleLikeClick}>👍{likes}</button>
                <button onClick={handleDislikeClick}>👎 {dislikes}</button>
            </section>
            <p>
                Autor: <Link to={`/users/${news.userId}`}>{news.userName}</Link>{' '}
                {fechaTexto}
            </p>
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
        </article>
    );
};
/////////////////////////////////////////////////////////////////////////
