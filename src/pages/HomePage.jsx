import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import Header from "../components/Header";
import { NewsList } from "../components/NewsList";
import useNews from "../hooks/useNews";
import { AuthContext } from "../context/AuthContext";
export const HomePage = () => {
  const { token } = useContext(AuthContext);
  const {
    news,
    setNews,
    loading,
    error,
    addNews,
    removeNews,
    topicNews,
    hotNews,
    showAllNews,
    keywordNews,
  } = useNews(token);
  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <ErrorMessage message={error} />;
  return (
    <>
      <Header showAllNews={showAllNews} keywordNews={keywordNews} />
      <main className="main-news">
        <div className="news-list">
          <NewsList
            news={news}
            setNews={setNews}
            addNews={addNews}
            removeNews={removeNews}
            topicNews={topicNews}
            hotNews={hotNews}
            showAllNews={showAllNews}
          />
        </div>
      </main>
    </>
  );
};
