import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './News.css';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { sendVoteService } from '../services';

export const News = ({ news, removeNews }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
    const [errorVisible, setErrorVisible] = useState(false);
    const env = import.meta.env.VITE_BACKEND;

    const handleLikeClick = async () => {
        try {
            const response = await sendVoteService(news.id, '1', token);
            setLikes(response.vPos);
            setDislikes(response.vNeg);
        } catch (error) {
            setError(error.message);
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 3000);
        }
    };

    const handleDislikeClick = async () => {
        try {
            const response = await sendVoteService(news.id, '2', token);
            setLikes(response.vPos);
            setDislikes(response.vNeg);
        } catch (error) {
            setError(error.message);
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 3000);
        }
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
                <button onClick={handleLikeClick}>
                    <IconThumbUp />
                    {likes}
                </button>
                <button onClick={handleDislikeClick}>
                    <IconThumbDown /> {dislikes}
                </button>
                {errorVisible && <p>{error}</p>}
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
/////////////////////////////////////////////////////
