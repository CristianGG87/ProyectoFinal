import "./UserNewsList.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IconThumbUp, IconThumbDown, IconTrash } from "@tabler/icons-react";
import ReactModal from "react-modal";
const UserNewsList = ({ news, env, removeNews }) => {
  const [setError] = useState("");
  const { token } = useContext(AuthContext);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [newsToDeleteId, setNewsToDeleteId] = useState(null);
  const [newsList, setNewsList] = useState(news);
  const deleteNews = async (id) => {
    try {
      await removeNews(id, token);
      setNewsList(newsList.filter((newsItem) => newsItem.id !== id));
      hideDeleteConfirmation();
    } catch (error) {
      setError(error.message);
    }
  };
  const showDeleteConfirmation = (id) => {
    setNewsToDeleteId(id);
    setDeleteConfirmationVisible(true);
  };
  const hideDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
  };

  return (
    <section className="show-own-news">
      {newsList.map((newsItem) => (
        <article className="own-news" key={newsItem.id}>
          <Link to={`/news/${newsItem.id}`}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.intro}</p>
            {newsItem.photo && (
              <img src={`${env}/${newsItem.photo}`} alt={newsItem.title} />
            )}
            <p>Tema: {newsItem.topic}</p>
          </Link>
          <section>
            <p>
              <IconThumbUp /> {newsItem.votes.positivos} <IconThumbDown />{" "}
              {newsItem.votes.negativos}
            </p>
          </section>
          <button onClick={() => showDeleteConfirmation(newsItem.id)}>
            <IconTrash />
          </button>
        </article>
      ))}
      <ReactModal
        isOpen={deleteConfirmationVisible}
        onRequestClose={hideDeleteConfirmation}
        contentLabel="Confirmar eliminación"
        className="custom-modal"
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        }}
      >
        <h2>Confirmar eliminación</h2>
        <p>¿Está seguro de que desea eliminar esta noticia?</p>
        <section className="button-confirm">
          <button className="cancel-button" onClick={hideDeleteConfirmation}>
            Cancelar
          </button>
          <button
            className="confirm-button"
            onClick={() => deleteNews(newsToDeleteId)}
          >
            Confirmar
          </button>
        </section>
      </ReactModal>
    </section>
  );
};
export default UserNewsList;
