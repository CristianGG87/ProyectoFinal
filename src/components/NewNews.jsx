import { useContext, useState } from 'react';
import { sendNewsService } from '../services';
import { AuthContext } from '../context/AuthContext';

export const NewNews = () => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const { token } = useContext(AuthContext);

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);

            const data = new FormData(e.target);
            const news = await sendNewsService({ data, token });

            console.log(news);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={handleForm}>
            <h1>Añadir noticia</h1>
            <fieldset>
                <label htmlFor="text">Titulo</label>
                <input type="text" id="title" name="title" required />
            </fieldset>
            <fieldset>
                <label htmlFor="text">Intro</label>
                <input type="text" id="intro" name="intro" required />
            </fieldset>
            <fieldset>
                <label htmlFor="text">Tema</label>
                <input type="text" id="topic" name="topic" required />
            </fieldset>
            <fieldset>
                <label htmlFor="text">Texto</label>
                <input type="text" id="text" name="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="photo">Image (optional)</label>
                <input type="file" id="photo" name="photo" />
            </fieldset>
            <button>Publicar noticia</button>
            {sending ? <p>Publicando noticia</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
