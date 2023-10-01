import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./CreateNews.css";
export const CreateNews = ({ addNews }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const data = new FormData(e.target);
      addNews(data, token);
      e.target.reset();
      setImage(null);
      toggleForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <section className="create-news">
      <button className="button-create-news" onClick={toggleForm}>
        {showForm ? "cerrar" : "Crear noticia"}
      </button>
      {showForm && (
        <form onSubmit={handleForm}>
          <fieldset>
            <label htmlFor="title">
              Titulo de la noticia (máximo 100 caracteres)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              maxLength={100}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="intro">Resumen noticia </label>
            <input type="text" id="intro" name="intro" required />
          </fieldset>
          <fieldset>
            <label htmlFor="topic">Tema de la noticia </label>
            <select id="topic" name="topic">
              <option value="ciencia">Ciencia</option>
              <option value="deportes">Deportes</option>
              <option value="cultura">Cultura</option>
              <option value="politica">Politica</option>
              <option value="actualidad">Actualidad</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="text">Contenido de la noticia</label>
            <textarea type="text" id="text" name="text" required rows="17" />
          </fieldset>
          <fieldset>
            <label htmlFor="photo">Foto (opcional)</label>
            <input
              className="image-input"
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image ? (
              <figure>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: "600px" }}
                />
              </figure>
            ) : null}
          </fieldset>
          <div className="button-container"></div>
          <button className="publicar">Publicar noticia</button>
          {sending ? <p>Publicando noticia</p> : null}
          {error ? <p>{error}</p> : null}
        </form>
      )}
      {sending ? <p>Publicando noticia</p> : null}
      {error ? <p>{error}</p> : null}
    </section>
  );
};
