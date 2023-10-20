import { useEffect, useState } from "react";
import { getSingleNewsService } from "../services";

const useOneNews = (id, token) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await getSingleNewsService(id, token);
        console.log(data);
        setNews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [id, token]);

  return { news, loading, error };
};

export default useOneNews;
