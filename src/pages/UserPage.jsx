import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import Header from "../components/Header";
import "./UserPage.css";
import { IconThumbUp, IconThumbDown } from "@tabler/icons-react";
export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const env = import.meta.env.VITE_BACKEND;
  return (
    <>
      <Header />
      <main>
        {loading && <p>Cargando los datos del usuario...</p>}
        {error && <ErrorMessage message={error} />}
        {user && (
          <>
            <section className="user-data">
              <section className="user-image">
                {user.user.photo ? (
                  <img
                    src={`${env}/${user.user.photo}`}
                    alt={user.user.userName}
                  />
                ) : null}
              </section>
              <h2>{user.user.userName}</h2>
              <p>Biografía: {user.user.biography}</p>
              <p>{user.user.email}</p>
            </section>
            <h2>Noticias:</h2>
            <section className="show-user-news">
              {user.user.news.map((newsItem) => (
                <article className="own-news" key={newsItem.id}>
                  <Link to={`/news/${newsItem.id}`}>
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.intro}</p>
                    {newsItem.photo && (
                      <img
                        src={`${env}/${newsItem.photo}`}
                        alt={newsItem.title}
                      />
                    )}
                  </Link>
                  <section>
                    <p>
                      <IconThumbUp /> {newsItem.votes.positivos}{" "}
                      <IconThumbDown /> {newsItem.votes.negativos}
                    </p>
                  </section>
                </article>
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};
