<<<<<<< HEAD
import { useContext, useState } from "react";
import { sendNewsService } from "../services";
import { AuthContext } from "../context/AuthContext";
=======
import { useContext, useState } from 'react';
import { sendNewsService } from '../services';
import { AuthContext } from '../context/AuthContext';
>>>>>>> 2a3ba195f95100a969cc89166246851497131959

export const NewNews = () => {
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
<<<<<<< HEAD
    const {token} = useContext(AuthContext);
=======
    const { token } = useContext(AuthContext);
>>>>>>> 2a3ba195f95100a969cc89166246851497131959

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);

            const data = new FormData(e.target);
<<<<<<< HEAD
            const news = await sendNewsService({data, token})

            console.log(news)
        } catch (error) {
            setError(error.message);

        } finally {
            setSending(false);
        }
    }

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
=======
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
>>>>>>> 2a3ba195f95100a969cc89166246851497131959
                <select id="topic" name="topic">
                    <option value="ciencia">Ciencia</option>
                    <option value="deportes">Deportes</option>
                    <option value="cultura">Cultura</option>
                    <option value="politica">Politica</option>
                    <option value="actualidad">Actualidad</option>
                </select>
            </fieldset>
            <fieldset>
<<<<<<< HEAD
                <label htmlFor="text">Text </label>
                <input type="text" id="text" name="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="foto">Foto (opcional)</label>
                <input type="file" id="" name="foto" />
            </fieldset>

=======
                <label htmlFor="text">Texto</label>
                <input type="text" id="text" name="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="photo">Image (optional)</label>
                <input type="file" id="photo" name="photo" />
            </fieldset>
>>>>>>> 2a3ba195f95100a969cc89166246851497131959
            <button>Publicar noticia</button>
            {sending ? <p>Publicando noticia</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
<<<<<<< HEAD
};
=======
};
>>>>>>> 2a3ba195f95100a969cc89166246851497131959
