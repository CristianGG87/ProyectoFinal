import { useEffect, useState } from 'react';
import { getAllNewsService } from '../services';

const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const addNews = (oneNews) => {
        setNews([oneNews, ...news]);
    };

    return { news, loading, error, addNews };
};

export default useNews;
