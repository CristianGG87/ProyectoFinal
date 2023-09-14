import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMyUserDataService } from '../services';
import { Link } from 'react-router-dom';
import useNews from '../hooks/useNews';
import UserNewsList from '../components/UserNewsList';

export const OwnUserPage = () => {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const env = import.meta.env.VITE_BACKEND;

    const { removeNews } = useNews();

    const handleDelete = async (news) => {
        try {
            await removeNews(news, token);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMyUserDataService({ token });
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error al obtener el perfil del usuario');
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) {
        return <p>Cargando los datos del usuario...</p>;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (user) {
        return (
            <section>
                <h1>Perfil Propio</h1>
                <p>Nombre: {user.user.userName}</p>
                <p>Correo electrónico: {user.user.email}</p>
                <button>Editar Email</button>
                <p>Biografía: {user.user.biography}</p>
                <button>Editar Biografia</button>
                <div>
                    {user.user.photo ? (
                        <img
                            src={`${env}/${user.user.photo}`}
                            alt={user.user.userName}
                        />
                    ) : null}
                    <button>Editar foto</button>
                </div>
                <p>
                    {' '}
                    Registrado el:
                    {new Date(user.user.createdAt).toLocaleDateString()}
                </p>

                <h2>Mis Noticias:</h2>
                <UserNewsList
                    news={user.user.news}
                    setUser={setUser}
                    env={env}
                    handleDelete={handleDelete}
                    error={error}
                />
            </section>
        );
    }
    return null;
};
///////////
