<<<<<<< HEAD
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';

export const OneNews = ({ news }) => {
    const {title, intro, text, photo, userName, date, id, userId} = news
    console.log(date)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);

    const { removeNews } = useNews();

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await removeNews(id, token);
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        } 
    }

    return (
        <article>
            <h2>{title}</h2>
            <h3>{intro}</h3>
            <p>{text}</p>
            {photo ? (
                <img
                    src={`http://localhost:8000/${photo}`}
                    alt={title}
                />
            ) : null}
            <p>
                Autor: {userName} el {new Date(date).toLocaleString()}
            </p>
            {user && user.user.id === userId ? (
                <section>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Se borrara la Noticia, esta seguro?'
                                )
                            )
                                handleDelete(id);
                        }}
                    >
                        Borrar noticia
                    </button>
                    {loading ? <p>Cargando...</p> : null}
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}
        </article>
    );
=======
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteNewsService } from "../services";
import { Link, useNavigate } from "react-router-dom";

export const OneNews = ({ news, removeNews }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const deleteNews = async (id) => {
    try {
      await deleteNewsService({ id, token });
      removeNews(id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <h2>{news.title}</h2>
      <h3>{news.intro}</h3>
      <p>{news.text}</p>
      {news.photo ? (
        <img src={`http://localhost:8000/${news.photo}`} alt={news.title} />
      ) : null}
      <p>
        Autor: {news.userName} el {new Date(news.date).toLocaleString()}
      </p>
      <Link to={"/"}>
        {user && user.user.id === news.userId ? (
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
      </Link>
    </article>
  );
>>>>>>> 19acfb26b005a107a2380b5c2cd92645df16f6f9
};
