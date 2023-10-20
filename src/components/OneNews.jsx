import "./OneNews.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useNews from "../hooks/useNews";
import ReactModal from "react-modal";
import {
  sendVoteService,
  updateNewsService,
  updateNewsPhotoService,
} from "../services";
import { IconThumbUp, IconThumbDown } from "@tabler/icons-react";
export const OneNews = ({ news }) => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const env = import.meta.env.VITE_BACKEND;
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNews, setEditedNews] = useState({ ...news });
  const [image, setImage] = useState(null);
  const { photo, userName, date, topic } = news;
  const [likes, setLikes] = useState(news.vPositive || 0);
  const [dislikes, setDislikes] = useState(news.vNegative || 0);
  const [thumbnail, setThumbnail] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [newsToDeleteId, setNewsToDeleteId] = useState(null);
  const handleLikeClick = async () => {
    try {
      const response = await sendVoteService(news.id, "1", token);
      setLikes(response.vPos);
      setDislikes(response.vNeg);
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
      const response = await sendVoteService(news.id, "2", token);
      setLikes(response.vPos);
      setDislikes(response.vNeg);
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    try {
      const response = await updateNewsService(news.id, editedNews, token);
      setEditedNews({ ...editedNews, ...response });
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEditPhotoSave = async () => {
    try {
      const response = await updateNewsPhotoService(news.id, image, token);
      setEditedNews({ ...editedNews, ...response });
      setIsEditing(false);
      setThumbnail(response.photo);
    } catch (error) {
      setError(error.message);
    }
  };
  const { removeNews } = useNews();
  const deleteNews = async (id) => {
    try {
      await removeNews(id, token);
      navigate("/");
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
    <section className="edit-news">
      {isEditing ? (
        <div className="modify-news">
          <p>Titulo de la noticia</p>
          <input
            type="text"
            value={editedNews.title}
            onChange={(e) =>
              setEditedNews({
                ...editedNews,
                title: e.target.value,
              })
            }
          />
          <p>Resumen</p>
          <input
            type="text"
            value={editedNews.intro}
            onChange={(e) =>
              setEditedNews({
                ...editedNews,
                intro: e.target.value,
              })
            }
          />
          <p>Contenido de la noticia</p>
          <textarea
            type="text"
            rows="17"
            value={editedNews.text}
            onChange={(e) =>
              setEditedNews({
                ...editedNews,
                text: e.target.value,
              })
            }
          />
          <button onClick={handleSaveClick}>Guardar Cambios</button>
        </div>
      ) : (
        <section>
          <h2>{editedNews.title}</h2>
          <h3>{editedNews.intro}</h3>
          {photo ? (
            <img src={`${env}/${editedNews.photo}`} alt={editedNews.title} />
          ) : null}
          <p>{editedNews.text}</p>
          <p>Tema: {topic}</p>
          <section className="like-buttons">
            <button onClick={handleLikeClick}>
              <IconThumbUp />
              {likes}
            </button>
            <button onClick={handleDislikeClick}>
              <IconThumbDown />
              {dislikes}
            </button>
          </section>
          {errorVisible && <p>{error}</p>}
          <p>
            Autor: {userName} el {new Date(date).toLocaleString()}
          </p>
        </section>
      )}
      {user && user.user.id === news.userId && !isEditing ? (
        <section className="edit-buttons">
          <button onClick={handleEditClick}>Editar noticia</button>
          <button onClick={() => showDeleteConfirmation(editedNews.id)}>
            Borrar noticia
          </button>
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
              <button
                className="cancel-button"
                onClick={hideDeleteConfirmation}
              >
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
      ) : null}
      {isEditing && (
        <form onSubmit={handleEditPhotoSave}>
          <fieldset>
            <label htmlFor="photo"></label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                if (e.target.files[0]) {
                  setThumbnail(URL.createObjectURL(e.target.files[0]));
                } else {
                  setThumbnail(null);
                }
              }}
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Miniatura de la imagen seleccionada"
                style={{ maxWidth: "200px" }}
              />
            )}
            <button>Guardar Foto</button>
          </fieldset>
        </form>
      )}
    </section>
  );
};
///////////////
