import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './News.css';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { sendVoteService } from '../services';
import ReactModal from 'react-modal';
export const News = ({ news, removeNews }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
    const [errorVisible, setErrorVisible] = useState(false);
    const env = import.meta.env.VITE_BACKEND;
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState(false);
    const [newsToDeleteId, setNewsToDeleteId] = useState(null);
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
    const showDeleteConfirmation = (id) => {
        setNewsToDeleteId(id);
        setDeleteConfirmationVisible(true);
    };
    const hideDeleteConfirmation = () => {
        setDeleteConfirmationVisible(false);
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
    ////

    return (
        <article className="news-display">
            <Link to={`/news/${news.id}`}>
                {news.photo ? (
                    <div className="image-container">
                        <img src={`${env}/${news.photo}`} alt={news.title} />
                    </div>
                ) : null}
            </Link>
            <section className="news-text">
                <Link to={`/news/${news.id}`}>
                    <h2>{news.title}</h2>
                </Link>
                <h3>{news.intro}</h3>
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
                    Autor:{' '}
                    {user && user.user && user.user.id === news.userId ? (
                        <Link to="/users">{news.userName}</Link>
                    ) : (
                        <Link to={`/users/${news.userId}`}>
                            {news.userName}
                        </Link>
                    )}{' '}
                    {fechaTexto}
                </p>
                {user && user.user.id === news.userId ? (
                    <section>
                        <button onClick={() => showDeleteConfirmation(news.id)}>
                            Borrar noticia
                        </button>
                    </section>
                ) : null}
                <ReactModal
                    isOpen={deleteConfirmationVisible}
                    onRequestClose={hideDeleteConfirmation}
                    contentLabel="Confirmar eliminación"
                    className="custom-modal"
                    shouldCloseOnEsc={true}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        },
                        content: {
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'absolute',
                            top: '180px',
                            left: '40px',
                            right: '50px',
                            bottom: '40px',
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            width: '280px',
                            height: '100px',
                            border: '1px solid black',
                            margin: '0 auto',
                            padding: '20px',
                        },
                    }}
                >
                    <h2>Confirmar eliminación</h2>
                    <p>¿Está seguro de que desea eliminar esta noticia?</p>
                    <section className="button-confirm">
                        <button
                            className="cancel-button"
                            onClick={hideDeleteConfirmation}
                        >
                            Cancelar
                        </button>
                        <button
                            className="confirm-button"
                            onClick={() => deleteNews(newsToDeleteId)}
                        >
                            Confirmar
                        </button>
                    </section>
                </ReactModal>
            </section>
        </article>
    );
};
