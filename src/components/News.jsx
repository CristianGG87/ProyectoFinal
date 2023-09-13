import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export const News = ({ news, removeNews }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const env = import.meta.env.VITE_BACKEND;

    const handleLikeClick = async () => {
        setLikes(likes + 1);
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
        setDislikes(dislikes + 1);
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
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteNews = async (id) => {
        try {
            removeNews(id, token);
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
            {news.photo ? (
                <img src={`${env}/${news.photo}`} alt={news.title} />
            ) : null}
            <section>
                <button onClick={handleLikeClick}>
                    Like ({news.vPositive})
                </button>
                <button onClick={handleDislikeClick}>
                    Dislike ({news.vNegative})
                </button>
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
