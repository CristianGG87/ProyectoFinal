import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMyUserDataService } from '../services'; // Importa el servicio
import { Link } from 'react-router-dom';

export const OwnUserPage = () => {
    const { token } = useContext(AuthContext); // Obtén el token de autenticación del contexto AuthContext
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMyUserDataService({ token }); // Utiliza el servicio
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
                            src={`http://localhost:8000/${user.user.photo}`}
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
                        <button>Editar foto</button>
                    </div>
                ))}
                {/* Otras acciones que puedes realizar en el perfil propio */}
            </section>
        );
    }

    return null;
};

//aaaa
