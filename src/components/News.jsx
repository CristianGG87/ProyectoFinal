import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteNewsService } from "../services";
export const News = ({ news, removeNews }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  console.log(removeNews);
  console.log(news);
  const deleteNews = async (id) => {
    try {
      await deleteNewsService({ id, token });
      removeNews(id);
      console.log(removeNews);
    } catch (error) {
      setError(error.message);
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
    <article>
      <Link to={`/news/${news.id}`}>
        <h2>{news.title}</h2>
      </Link>
      <h3>{news.intro}</h3>
      {news.photo ? (
        <img src={`http://localhost:8000/${news.photo}`} alt={news.title} />
      ) : null}
      <p>
        Autor: <Link to={`/users/${user.id}`}>{news.userName}</Link>{" "}
        {fechaTexto}
      </p>
      {user && user.id === news.userId ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("Se borrara la Noticia, esta seguro?"))
                deleteNews(news.id);
            }}
          >
            Borrar noticia
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
