import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import {
    updateEmailService,
    getMyUserDataService,
    editUserBioService,
} from '../services';

import useNews from '../hooks/useNews';
import UserNewsList from '../components/UserNewsList';

export const OwnUserPage = () => {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const env = import.meta.env.VITE_BACKEND;
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [biography, setBiography] = useState(''); // Estado para la biografía
    const [isEditingBiography, setIsEditingBiography] = useState(false); // Estado para controlar la edición de la biografía

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
                setBiography(userData.user.biography); // Establecer la biografía desde los datos del usuario
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

    const handleEditEmail = () => {
        setEditEmail(true);
    };

    // Función para activar la edición de la biografía
    const handleEditBiography = () => {
        setIsEditingBiography(true);
    };

    const handleSaveEmail = async () => {
        try {
            await updateEmailService(token, oldEmail, newEmail);
            setUser({ ...user, user: { ...user.user, email: newEmail } });
            setEditEmail(false);
        } catch (error) {
            console.error(error);
            setError('Error al actualizar el correo electrónico');
        }
    };

    const handleSaveBiography = async () => {
        try {
            await editUserBioService(token, biography);
            setUser({ ...user, user: { ...user.user, biography: biography } });
            setIsEditingBiography(false);
        } catch (error) {
            console.error(error);
            setError('Error al actualizar la biografía');
        }
    };

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (user) {
        return (
            <section>
                <h1>Perfil Propio</h1>
                <p>Nombre: {user.user.userName}</p>
                {editEmail ? (
                    <div>
                        <input
                            type="email"
                            placeholder="Antiguo correo electrónico"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Nuevo correo electrónico"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={handleSaveEmail}>Guardar</button>
                    </div>
                ) : (
                    <p>Correo electrónico: {user.user.email}</p>
                )}
                <button onClick={handleEditEmail}>Editar Email</button>

                {isEditingBiography ? (
                    <div>
                        <textarea
                            placeholder="Nueva biografía del usuario"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                        />
                        <button onClick={handleSaveBiography}>
                            Guardar Biografía
                        </button>
                    </div>
                ) : (
                    <p>Biografía: {user.user.biography}</p>
                )}
                {isEditingBiography ? null : (
                    <button onClick={handleEditBiography}>
                        Editar Biografía
                    </button>
                )}

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
