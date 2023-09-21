import './OneNews.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';
import {
    sendVoteService,
    updateNewsService,
    updateNewsPhotoService,
} from '../services';

export const OneNews = ({ news }) => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const env = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNews, setEditedNews] = useState({ ...news });
    const [image, setImage] = useState(null);
    const { photo, userName, date, topic } = news;
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
    const [thumbnail, setThumbnail] = useState(null);

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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await updateNewsService(
                news.id,
                editedNews,
                token
            );
            setEditedNews({ ...editedNews, ...response });
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditPhotoSave = async () => {
        try {
            const response = await updateNewsPhotoService(
                news.id,
                image,
                token
            );
            setEditedNews({ ...editedNews, ...response });
            setIsEditing(false);
            setThumbnail(response.photo);
        } catch (error) {
            setError(error.message);
        }
    };

    const { removeNews } = useNews();
    const deleteNews = async (id) => {
        try {
            await removeNews(id, token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="edit-news">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedNews.title}
                        onChange={(e) =>
                            setEditedNews({
                                ...editedNews,
                                title: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        value={editedNews.intro}
                        onChange={(e) =>
                            setEditedNews({
                                ...editedNews,
                                intro: e.target.value,
                            })
                        }
                    />
                    <textarea
                        type="text"
                        value={editedNews.text}
                        onChange={(e) =>
                            setEditedNews({
                                ...editedNews,
                                text: e.target.value,
                            })
                        }
                    />
                    <button onClick={handleSaveClick}>Guardar Cambios</button>
                </div>
            ) : (
                <div>
                    <h2>{editedNews.title}</h2>
                    <h3>{editedNews.intro}</h3>
                    <p>{editedNews.text}</p>

                    {photo ? (
                        <img
                            src={`${env}/${editedNews.photo}`}
                            alt={editedNews.title}
                        />
                    ) : null}

                    <p>Tema: {topic}</p>
                    <section className="likes">
                        <button onClick={handleLikeClick}>👍{likes}</button>
                        <button onClick={handleDislikeClick}>
                            👎{dislikes}
                        </button>
                        {errorVisible && <p>{error}</p>}
                    </section>
                    <p>
                        Autor: {userName} el {new Date(date).toLocaleString()}
                    </p>
                </div>
            )}

            {user && user.user.id === news.userId && !isEditing ? (
                <section>
                    <button onClick={handleEditClick}>Editar noticia</button>
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
                </section>
            ) : null}

            {isEditing && (
                <form onSubmit={handleEditPhotoSave}>
                    <fieldset>
                        <label htmlFor="photo">Editar foto</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => {
                                console.log(e.target.files[0]);
                                setImage(e.target.files[0]);

                                if (e.target.files[0]) {
                                    setThumbnail(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                } else {
                                    setThumbnail(null);
                                }
                            }}
                        />
                        {thumbnail && (
                            <img
                                src={thumbnail}
                                alt="Miniatura de la imagen seleccionada"
                                style={{ maxWidth: '200px' }}
                            />
                        )}

                        <button>Guardar Foto</button>
                    </fieldset>
                </form>
            )}
        </section>
    );
};
