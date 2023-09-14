import { Link } from 'react-router-dom';
import useNews from '../hooks/useNews';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMyUserDataService } from '../services';
const UserNewsList = ({ news, setUser, env }) => {
    const [error, setError] = useState('');
    const { removeNews } = useNews();
    const { token } = useContext(AuthContext);
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await removeNews(id, token);
            //tengo que recuperar el usuario porque contiene el listado nuevo
            const userData = await getMyUserDataService({ token });
            //setear el usuario
            setUser(userData);
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            {news.map((newsItem) => (
                <div key={newsItem.id}>
                    <Link to={`/news/${newsItem.id}`}>
                        <h3>{newsItem.title}</h3>
                    </Link>
                    <p>{newsItem.intro}</p>
                    {newsItem.photo && (
                        <img
                            src={`${env}/${newsItem.photo}`}
                            alt={newsItem.title}
                        />
                    )}
                    <button>Editar foto</button>
                    <section>
                        <button
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Se borrará la Noticia, ¿está seguro?'
                                    )
                                )
                                    handleDelete(newsItem.id);
                            }}
                        >
                            Borrar noticia
                        </button>
                        {error && <p>{error}</p>}
                    </section>
                </div>
            ))}
        </div>
    );
};
export default UserNewsList;
