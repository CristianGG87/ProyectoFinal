import { useEffect, useState } from 'react';
import { getAllNewsService } from '../services/index';

const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);

                const data = await getAllNewsService();

                setNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    const addNews = (data) => {
        setNews([data, ...news]);
    };

    const removeNews = (id) => {
        setNews(news.filter((oneNews) => oneNews.id !== id));
    };

    return { news, loading, error, addNews, removeNews };
};

export default useNews;
