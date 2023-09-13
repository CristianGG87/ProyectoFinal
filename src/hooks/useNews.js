import { useEffect, useState } from 'react';
import {
    deleteNewsService,
    getAllNewsService,
    getUserNewsService,
    sendNewsService,
} from '../services';

const useNews = (id) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = id
                    ? getUserNewsService(id)
                    : await getAllNewsService();
                setNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, [id]);

    const addNews = async (oneNews, token) => {
        await sendNewsService(oneNews, token);
        const allNews = await getAllNewsService();
        setNews(allNews);
    };

    const removeNews = async (id, token) => {
        await deleteNewsService(id, token);
        const allNews = await getAllNewsService();
        setNews(allNews);
    };

    return { news, setNews, loading, error, addNews, removeNews };
};

export default useNews;
