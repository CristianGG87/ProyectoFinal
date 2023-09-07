import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewsList } from "../components/NewsList";
import useNews from "../hooks/useNews";
import { AuthContext } from "../context/AuthContext";
import { NewNews } from "../components/NewNews";

export const HomePage = () => {
  const { news, loading, error } = useNews();
  const {user} = useContext(AuthContext);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Ultimas Noticias</h1>
      {user ? <NewNews /> : null}

      <NewsList news={news} />
    </section>
  );
};
