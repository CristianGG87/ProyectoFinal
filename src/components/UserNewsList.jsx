import './UserNewsList.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import ReactModal from 'react-modal';

const UserNewsList = ({ news, env, removeNews }) => {
    const [setError] = useState('');

    const { token } = useContext(AuthContext);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState(false);
    const [newsToDeleteId, setNewsToDeleteId] = useState(null);
    const [newsList, setNewsList] = useState(news);

    const deleteNews = async (id) => {
        try {
            await removeNews(id, token);
            // Actualiza el estado local después de eliminar
            setNewsList(newsList.filter((newsItem) => newsItem.id !== id));
            hideDeleteConfirmation();
        } catch (error) {
            setError(error.message);
        }
    };

    const showDeleteConfirmation = (id) => {
        setNewsToDeleteId(id);
        setDeleteConfirmationVisible(true);
    };
    const hideDeleteConfirmation = () => {
        setDeleteConfirmationVisible(false);
    };

    {
        news ? (
            <section>
                {/* Agregar un console.log para verificar el valor de news.id */}
                {console.log('Valor de news.id:', news)}
                <button onClick={() => showDeleteConfirmation(news.id)}>
                    Borrar noticia
                </button>
            </section>
        ) : null;
    }

    return (
        <section className="show-own-news">
            {newsList.map((newsItem) => (
                <article className="own-news" key={newsItem.id}>
                    <Link to={`/news/${newsItem.id}`}>
                        <h3>{newsItem.title}</h3>
                    </Link>
                    <p>{newsItem.intro}</p>
                    {newsItem.photo && (
                        <img
                            src={`${env}/${newsItem.photo}`}
                            alt={newsItem.title}
                        />
                    )}
                    <p>Tema: {newsItem.topic}</p>
                    <section>
                        <p>
                            <IconThumbUp /> {newsItem.votes.positivos}{' '}
                            <IconThumbDown /> {newsItem.votes.negativos}
                        </p>
                    </section>
                    <button onClick={() => showDeleteConfirmation(newsItem.id)}>
                        Borrar noticia
                    </button>
                </article>
            ))}

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
    );
};
export default UserNewsList;
