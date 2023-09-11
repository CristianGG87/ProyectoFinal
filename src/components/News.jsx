import { Link } from 'react-router-dom';

export const OneNews = ({ oneNews, removeNews }) => {
    const fechaNoticia = new Date(news.date);
import { AuthContext } from '../context/AuthContext';
import { deleteNewsService } from '../services';
export const OneNews = ({ oneNews, removeNews }) => {
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState('');
    console.log(removeNews);
    console.log(oneNews);
    const deleteNews = async (id) => {
        try {
            await deleteNewsService({ id, token });
            removeNews(id);
            console.log(removeNews);
        } catch (error) {
            setError(error.message);
        }
    };
    const fechaNoticia = new Date(oneNews.date);
    const fechaActual = new Date();
    const diferenciaEnMS = fechaActual - fechaNoticia;
    const segundos = Math.floor(diferenciaEnMS / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    let fechaTexto;

    if (dias > 0) {
        fechaTexto = `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else if (horas > 0) {
        fechaTexto = `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (minutos > 0) {
        fechaTexto = `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else {
        fechaTexto = `Hace unos segundos`;
    }

    return (
        <article>
            <Link to={`/news/${oneNews.id}`}>
                <h2>{oneNews.title}</h2>
            </Link>
            <h3>{oneNews.intro}</h3>
            {oneNews.photo ? (
                <img
                    src={`http://localhost:8000/${oneNews.photo}`}
                    alt={oneNews.title}
                />
            ) : null}
            <p>
                Autor: {oneNews.userName} {fechaTexto}
            </p>
            {user && user.id === oneNews.userId ? (
                <section>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Se borrara la Noticia, esta seguro?'
                                )
                            )
                                deleteNews(oneNews.id);
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
