import { Link } from "react-router-dom";
export const Noticia = ({ news }) => {
  console.log({ news });
  return (
    <article>
      <Link to={`/news/${news.id}`}>
        <p>{news.title}</p>
      </Link>
      {news.photo ? (
        <img src={`http://localhost:8000/${news.photo}`} alt={news.title} />
      ) : null}
      <p>
        Autor: {news.userName} el {new Date(news.date).toLocaleString()}
      </p>
    </article>
  );
};
