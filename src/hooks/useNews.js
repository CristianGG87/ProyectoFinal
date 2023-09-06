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

    return { news, loading, error };
};

export default useNews;
