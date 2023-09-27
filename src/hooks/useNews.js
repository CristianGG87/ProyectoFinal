import { useEffect, useState } from "react";
import {
  deleteNewsService,
  getAllNewsService,
  getUserNewsService,
  sendNewsService,
} from "../services";
const useNews = (id) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = id ? getUserNewsService(id) : await getAllNewsService();
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
  const topicNews = async (topic) => {
    const allNews = await getAllNewsService({ topic });
    console.log("Desde useNews", allNews);
    setNews(allNews);
  };
  const keywordNews = async (keyword) => {
    const allNews = await getAllNewsService({ keyword });
    setNews(allNews);
  };
  const hotNews = async () => {
    const allNews = await getAllNewsService();
    allNews.news.sort((a, b) => b.vPositive - a.vPositive);
    setNews(allNews);
  };
  const showAllNews = async () => {
    const allNews = await getAllNewsService();
    setNews(allNews);
  };
  return {
    news,
    setNews,
    loading,
    error,
    addNews,
    removeNews,
    topicNews,
    keywordNews,
    hotNews,
    showAllNews,
  };
};
export default useNews;
