import { useEffect, useState } from 'react';
import { getSingleNewsService } from '../services';

const useOneNews = (id) => {
    const [news, setNews] = useState([]);
    const [oneNews, setOneNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = await getSingleNewsService(id);

                setOneNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, [id]);
    const removeNews = (id) => {
        setNews(news.filter((oneNews) => oneNews.id !== id));
    };
    return { oneNews, loading, error, removeNews };
};

export default useOneNews;
