import { useContext, useEffect, useState } from 'react';
import { getSingleNewsService } from '../services';
import { AuthContext } from '../context/AuthContext';

const useOneNews = (id, setIsEditing) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { token } = useContext(AuthContext);
    const env = import.meta.env.VITE_BACKEND;

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = await getSingleNewsService(id);

                setNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, [id]);

    const editText = async (formData) => {
        try {
            const response = await fetch(`${env}/news/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la noticia.');
            }
            const data = await getSingleNewsService(id);
            setNews(data);
            /*const responseData = await response.json();
            setEditedNews({ ...editedNews, ...responseData.data });
            setNews(editedNews);
            console.log('responseData', responseData.data);*/
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };
    const editPhoto = async (formData) => {
        try {
            // if (!image) {
            //     throw new Error('No se ha seleccionado una imagen.');
            // }
            // const formData = new FormData();
            // formData.append('photo', image);
            const response = await fetch(`${env}/news/${id}/photos`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la foto de la noticia.');
            }
            /* const responseData = await response.json();
            console.log('resp', responseData.data);
            console.log(editedNews);
            setEditedNews({ ...editedNews, ...responseData.data });
            setNews(editedNews);

            console.log(editedNews);
            console.log(news);*/

            const data = await getSingleNewsService(id);
            setNews(data);
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return { news, loading, error, editPhoto, editText };
};

export default useOneNews;
