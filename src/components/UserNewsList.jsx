import { Link } from 'react-router-dom';
import useNews from '../hooks/useNews';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMyUserDataService } from '../services';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';

const UserNewsList = ({ news, setUser, env }) => {
    const [error, setError] = useState('');
    const { removeNews } = useNews();
    const { token } = useContext(AuthContext);

    const handleDelete = async (id) => {
        try {
            await removeNews(id, token);

            const userData = await getMyUserDataService({ token });

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
                    <p>Tema: {newsItem.topic}</p>
                    <section>
                        <p>
                            <IconThumbUp /> {newsItem.votes.positivos}{' '}
                            <IconThumbDown />
                            {newsItem.votes.negativos}
                        </p>
                    </section>
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
