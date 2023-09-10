import { useContext, useState } from 'react';
import { sendNewsService } from '../services';
import { AuthContext } from '../context/AuthContext';

export const CreateNews = ({ addNews }) => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const { token } = useContext(AuthContext);
    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const data = new FormData(e.target);
            const oneNews = await sendNewsService({ data, token });
            console.log(oneNews);
            console.log(addNews);

            addNews(oneNews);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <h1>Añadir noticia:</h1>
            <fieldset>
                <label htmlFor="title">Titulo de la notica </label>
                <input type="text" id="title" name="title" required />
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
                <label htmlFor="text">Text </label>
                <input type="text" id="text" name="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="photo">Foto (opcional)</label>
                <input type="file" id="photo" name="photo" accept="image/*" />
            </fieldset>
            <button>Publicar noticia</button>
            {sending ? <p>Publicando noticia</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
