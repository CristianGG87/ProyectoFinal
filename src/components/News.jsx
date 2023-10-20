import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./News.css";
import {
  IconThumbUp,
  IconThumbDown,
  IconThumbUpFilled,
  IconThumbDownFilled,
} from "@tabler/icons-react";
import { sendVoteService } from "../services";
export const News = ({ news }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(news.vPositive || 0);
  const [dislikes, setDislikes] = useState(news.vNegative || 0);
  const [errorVisible, setErrorVisible] = useState(false);
  const env = import.meta.env.VITE_BACKEND;
  const [userVote, setUserVote] = useState(news.userVote || 0);

  useEffect(() => {
    setUserVote(news.userVote || 0);
  }, [news.userVote]);

  const handleLikeClick = async () => {
    try {
      if (userVote === 1) {
        const response = await sendVoteService(news.id, "1", token);
        setLikes(response.vPos);
        setUserVote(0);
      } else {
        const response = await sendVoteService(news.id, "1", token);
        setLikes(response.vPos);
        setDislikes(response.vNeg);
        setUserVote(1);
      }
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (userVote === 2) {
        const response = await sendVoteService(news.id, "2", token);
        setDislikes(response.vNeg);
        setUserVote(0);
      } else {
        const response = await sendVoteService(news.id, "2", token);
        setLikes(response.vPos);
        setDislikes(response.vNeg);
        setUserVote(2);
      }
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };
  const fechaNoticia = new Date(news.date);
  const fechaActual = new Date();
  const diferenciaEnMS = fechaActual - fechaNoticia;
  const segundos = Math.floor(diferenciaEnMS / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  let fechaTexto;
  if (dias > 0) {
    fechaTexto = `Hace ${dias} día${dias > 1 ? "s" : ""}`;
  } else if (horas > 0) {
    fechaTexto = `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
  } else if (minutos > 0) {
    fechaTexto = `Hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  } else {
    fechaTexto = `Hace unos segundos`;
  }

  return (
    <article className="news-display">
      <div className="topic-container">
        <p className="topic">{news.topic}</p>
        <Link to={`/news/${news.id}`}>
          {news.photo ? (
            <div className="image-container">
              <img src={`${env}/${news.photo}`} alt={news.title} />
            </div>
          ) : null}
        </Link>
      </div>
      <section className="news-text">
        <Link to={`/news/${news.id}`}>
          <h2>{news.title}</h2>
          <h3>{news.intro}</h3>
        </Link>
        <div className="likes-autor">
          <section className="likes">
            {userVote === 1 ? (
              <button onClick={handleLikeClick}>
                <IconThumbUpFilled />
                {likes}
              </button>
            ) : (
              <button onClick={handleLikeClick}>
                <IconThumbUp />
                {likes}
              </button>
            )}
            {userVote === 2 ? (
              <button onClick={handleDislikeClick}>
                <IconThumbDownFilled />
                {dislikes}
              </button>
            ) : (
              <button onClick={handleDislikeClick}>
                <IconThumbDown />
                {dislikes}
              </button>
            )}
            <div className="error-container">
              {errorVisible && <p>{error}</p>}
            </div>
          </section>
          <p className="autor">
            Autor:{" "}
            {user && user.user && user.user.id === news.userId ? (
              <Link to="/users">{news.userName}</Link>
            ) : (
              <Link to={`/users/${news.userId}`}>{news.userName}</Link>
            )}{" "}
            {fechaTexto}
          </p>
        </div>
      </section>
    </article>
  );
};
