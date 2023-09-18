import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';
export const OneNews = ({ news }) => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const env = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedNews, setEditedNews] = useState({ ...news });
    const [image, setImage] = useState(null); // Nuevo estado para la imagen
    const [responseError, setResponseError] = useState(null);
    const { photo, userName, date, topic } = news;
    const [likes, setLikes] = useState(news.vPositive || 0);
    const [dislikes, setDislikes] = useState(news.vNegative || 0);
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
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditPhotoClick = () => {
        setIsEditing(true); // Habilitar la edición de la foto
    };
    const handleSaveClick = async () => {
        try {
            const formData = new FormData();
            formData.append('title', editedNews.title);
            formData.append('intro', editedNews.intro);
            formData.append('text', editedNews.text);
            const response = await fetch(`${env}/news/${news.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la noticia.');
            }
            setIsEditing(false);
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
            setResponseError(error.message);
        }
    };
    const handleEditPhotoSave = async () => {
        try {
            if (!image) {
                throw new Error('No se ha seleccionado una imagen.');
            }
            const formData = new FormData();
            formData.append('photo', image);
            const response = await fetch(`${env}/news/${news.id}/photos`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la foto de la noticia.');
            }
            setIsEditing(false); // Deshabilitar la edición de la foto
            // Recargar la página para reflejar los cambios en la foto
            window.location.reload();
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
            setResponseError(error.message);
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
            <div>
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
                            value={editedNews.text}
                            onChange={(e) =>
                                setEditedNews({
                                    ...editedNews,
                                    text: e.target.value,
                                })
                            }
                        />
                        <button onClick={handleSaveClick}>
                            Guardar Cambios
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>{news.title}</h2>
                        <h3>{news.intro}</h3>
                        <p>{news.text}</p>
                        {photo ? (
                            <img src={`${env}/${photo}`} alt={news.title} />
                        ) : null}
                        <p>Tema: {topic}</p>
                        <section>
                            <button onClick={handleLikeClick}>👍{likes}</button>
                            <button onClick={handleDislikeClick}>
                                👎{dislikes}
                            </button>
                        </section>
                        <p>
                            Autor: {userName} el{' '}
                            {new Date(date).toLocaleString()}
                        </p>
                    </div>
                )}
                {user && user.user.id === news.userId && (
                    <section>
                        {isEditing ? (
                            <>
                                <button onClick={handleEditPhotoClick}>
                                    Editar Foto
                                </button>
                                <button onClick={handleDelete}>
                                    Borrar Noticia
                                </button>
                                {error && <p>{error}</p>}
                            </>
                        ) : (
                            <>
                                <button onClick={handleEditClick}>
                                    Editar Noticia
                                </button>
                                <button onClick={handleDelete}>
                                    Borrar Noticia
                                </button>
                                {error && <p>{error}</p>}
                            </>
                        )}
                    </section>
                )}
            </div>
            {isEditing && (
                <div>
                    <fieldset>
                        <label htmlFor="photo">Editar foto</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </fieldset>
                    <button onClick={handleEditPhotoSave}>Guardar Foto</button>
                </div>
            )}
        </article>
    );
};

/////////////////////////////////////////////////////
