import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';
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
            console.log('response', response);
            if (!response.ok) {
                throw new Error('No puedes votar tu propia noticia');
            }
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            setLikes(responseData.data.vPos);
            setDislikes(responseData.data.vNeg);
        } catch (error) {
            setError(error.message);
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 3000);
        }
    };
    const handleLikeClick = () => {
        sendVoteToBackend('1');
        console.log('votos:', news.vPositive);
    };
    const handleDislikeClick = () => {
        sendVoteToBackend('2');
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditPhotoClick = () => {
        setIsEditing(true);
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
            const responseData = await response.json();
            setEditedNews({ ...editedNews, ...responseData.data });
            console.log('responseData', responseData.data);
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };
    const handleEditPhotoSave = async () => {
        console.log('Hola');
        try {
            if (!image) {
                throw new Error('No se ha seleccionado una imagen.');
            }
            const formData = new FormData();
            formData.append('photo', image);
            console.log(formData);
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

            const responseData = await response.json();
            console.log('resp', responseData.data);
            setEditedNews({ ...editedNews, ...responseData.data });

            setIsEditing(false);
            setThumbnail(responseData.data.photo);
        } catch (error) {
            setError(error.message);
        }
    };
    const { removeNews } = useNews();
    const deleteNews = async (id) => {
        console.log(id);
        try {
            await removeNews(id, token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };
    console.log(editedNews.photo);
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
                            Autor: {userName} el{' '}
                            {new Date(date).toLocaleString()}
                        </p>
                    </div>
                )}

                {user && user.user.id === news.userId && !isEditing ? (
                    <section>
                        <button onClick={handleEditPhotoClick}>
                            Editar noticia
                        </button>
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
            </div>
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
        </article>
    );
};
////////////////
