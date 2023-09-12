import { Link, useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { ErrorMessage } from '../components/ErrorMessage';

export const UserPage = () => {
    const { id } = useParams();
    const { user, loading, error } = useUser(id);
    if (user) {
        console.log(user.user.news);
    }
    return (
        <section>
            <h1> Datos del perfil </h1>
            {loading && <p>Cargando los datos del usuario...</p>}
            {error && <ErrorMessage message={error} />}

            {user && (
                <>
                    <p>Nombre: {user.user.userName}</p>
                    <p>Correo electrónico: {user.user.email}</p>
                    <p>Biografía: {user.user.biography}</p>
                    {user.user.photo ? (
                        <img
                            src={`http://localhost:8000/${user.user.photo}`}
                            alt={user.user.userName}
                        />
                    ) : null}
                    <p>
                        Registrado el:
                        {new Date(user.user.createdAt).toLocaleDateString()}
                    </p>

                    <h2>Noticias:</h2>
                    {user.user.news.map((newsItem) => (
                        <div key={newsItem.id}>
                            <Link to={`/news/${newsItem.id}`}>
                                <h3>{newsItem.title}</h3>
                            </Link>
                            <p>{newsItem.intro}</p>
                            {newsItem.photo && (
                                <img
                                    src={`http://localhost:8000/${newsItem.photo}`}
                                    alt={newsItem.title}
                                />
                            )}
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};
