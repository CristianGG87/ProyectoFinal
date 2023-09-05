import { useEffect, useState } from "react";
import { getSingleNewsService } from "../services";

const useOneNews = (id) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  return { news, loading, error };
};

export default useOneNews;
